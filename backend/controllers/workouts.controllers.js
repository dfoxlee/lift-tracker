import { formatDateForDb } from "../utils/formatting.utils.js";
import {
   createWorkout,
   deleteWorkout,
   findAllUserWorkouts,
   findWorkoutById,
   updateWorkout,
} from "../services/workouts.services.js";
import {
   createExercise,
   updateExercise,
   getExercisesByWorkoutId,
   deleteExercise,
} from "../services/exercises.services.js";
import {
   createExerciseSet,
   getExerciseSetsByExerciseId,
   updateExerciseSet,
   deleteExerciseSetById,
} from "../services/exercise-sets.services.js";
import { debugLogger } from "../utils/debug-logger.utils.js";
import { debug } from "console";

export const createNewWorkout = async (req, res, next) => {
   try {
      const { workout } = req.body;

      const { workoutName, exercises } = workout;

      const createdDate = formatDateForDb(new Date());

      const result = await createWorkout({
         userId: req.userId,
         workoutName,
         createdDate,
      });

      const newWorkoutId = result.insertId;

      for (const exercise of exercises) {
         const { exerciseName, exerciseOrder, exerciseSets } = exercise;

         const newExerciseId = await createExercise({
            workoutId: newWorkoutId,
            exerciseOrder,
            exerciseName,
         });

         for (const set of exerciseSets) {
            const { exerciseSetOrder, reps, weight, weightUnitId } = set;

            await createExerciseSet({
               exerciseId: newExerciseId.insertId,
               exerciseSetOrder: exerciseSetOrder,
               reps,
               weight,
               weightUnitId,
            });
         }
      }

      res.status(201).json({ message: "Workout created successfully" });
   } catch (error) {
      next(error);
   }
};

export const getUserWorkouts = async (req, res, next) => {
   try {
      const { userId } = req;

      const workouts = await findAllUserWorkouts({ userId });

      res.status(200).json({ workouts });
   } catch (error) {
      next(error);
   }
};

export const getUserWorkoutById = async (req, res, next) => {
   try {
      const { workoutId } = req.params;

      const workout = await findWorkoutById({ workoutId });

      const exercises = await getExercisesByWorkoutId({ workoutId });

      const exercisesWithSets = await Promise.all(
         exercises.map(async (exercise) => {
            const exerciseSets = await getExerciseSetsByExerciseId({
               exerciseId: exercise.exerciseId,
            });

            return {
               ...exercise,
               exerciseSets,
            };
         })
      );

      res.status(200).json({
         workout: { ...workout, exercises: exercisesWithSets },
      });
   } catch (error) {
      next(error);
   }
};

export const updateWorkoutController = async (req, res, next) => {
   try {
      const { workout } = req.body;
      const { workoutId, workoutName, exercises } = workout;

      const existingWorkout = await findWorkoutById({ workoutId });

      if (!existingWorkout) {
         throw new Error("Workout not found.");
      }

      await updateWorkout({ workoutId, workoutName });

      const existingExercises = await getExercisesByWorkoutId({ workoutId });
      const existingExerciseIds = existingExercises.map((ex) => ex.exerciseId);

      for (var exercise of exercises) {
         const { exerciseId, exerciseName, exerciseOrder, exerciseSets } =
            exercise;

         if (!exerciseId) {
            const newExerciseId = await createExercise({
               workoutId,
               exerciseOrder,
               exerciseName,
            });

            for (const set of exerciseSets) {
               const { exerciseSetOrder, reps, weight, weightUnitId } = set;

               await createExerciseSet({
                  exerciseId: newExerciseId.insertId,
                  exerciseSetOrder,
                  reps,
                  weight,
                  weightUnitId,
               });
            }
         } else {
            const existingIndex = existingExerciseIds.indexOf(exerciseId);

            if (existingIndex > -1) {
               existingExerciseIds.splice(existingIndex, 1);
            }

            await updateExercise({
               exerciseId,
               exerciseName,
               exerciseOrder,
            });

            const existingSets = await getExerciseSetsByExerciseId({
               exerciseId,
            });

            const existingSetIds = existingSets.map((set) => set.exerciseSetId);

            for (const set of exerciseSets) {
               const {
                  exerciseSetId,
                  exerciseSetOrder,
                  reps,
                  weight,
                  weightUnitId,
               } = set;

               if (!exerciseSetId) {
                  await createExerciseSet({
                     exerciseId,
                     exerciseSetOrder,
                     reps,
                     weight,
                     weightUnitId,
                  });
               } else {
                  const existingSetIndex =
                     existingSetIds.indexOf(exerciseSetId);
                  if (existingSetIndex > -1) {
                     existingSetIds.splice(existingSetIndex, 1);
                  }

                  await updateExerciseSet({
                     exerciseSetId,
                     exerciseSetOrder,
                     reps,
                     weight,
                     weightUnitId,
                  });
               }
            }

            for (const setId of existingSetIds) {
               await deleteExerciseSetById(setId);
            }
         }
      }

      for (const exId of existingExerciseIds) {
         await deleteExercise({ exerciseId: exId });
      }

      return res.status(200).json({ message: "Workout updated successfully." });
   } catch (error) {
      next(error);
   }
};

export const deleteWorkoutById = async (req, res, next) => {
   try {
      const { workoutId } = req.params;

      await deleteWorkout({ workoutId });

      return res.status(200).json("Workout deleted successfully.");
   } catch (error) {
      next(error);
   }
};
