import {
   getExerciseSetsByExerciseId,
   getExerciseSetByExerciseSetId,
   updateExerciseSet,
} from "../services/exercise-sets.services.js";
import {
   getExerciseByExerciseId,
   getExercisesByWorkoutId,
   updateExercise,
} from "../services/exercises.services.js";
import { findWorkoutById } from "../services/workouts.services.js";
import {
   getCompletedWorkoutByUserId,
   getCompletedWorkoutByCompletedWorkoutId,
   createCompletedWorkout,
   deleteCompletedWorkoutByCompletedWorkoutId,
} from "../services/completed-workouts.services.js";
import {
   getCompletedExerciseByCompletedWorkoutId,
   createCompletedExercise,
   deleteCompletedExerciseByCompletedExerciseId,
   updateCompletedExercise,
} from "../services/completed-exercises.services.js";
import {
   getCompletedExerciseSetsByCompletedExerciseId,
   createCompletedExerciseSet,
   updateCompletedExerciseSet,
} from "../services/completed-exercise-sets.services.js";

export const getNewCompletedWorkout = async (req, res, next) => {
   try {
      const { workoutId } = req.params;
      const { userId } = req;

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

      const completedWorkout = {
         completedWorkoutName: workout.workoutName,
         completedExercises: exercisesWithSets.map((e) => ({
            exerciseId: e.exerciseId,
            completedExerciseOrder: e.exerciseOrder,
            completedExerciseName: e.exerciseName,
            completedExerciseNotes: "",
            latestExerciseNote: e.latestExerciseNote || "",
            completedExerciseSets: e.exerciseSets.map((s) => ({
               exerciseSetId: s.exerciseSetId,
               completedExerciseSetOrder: s.exerciseSetOrder,
               completedReps: s.reps,
               completedWeight: s.weight,
               completedWeightUnitId: s.weightUnitId,
               completedExerciseSetNotes: "",
               isCompleted: false,
               latestExerciseSetNote: s.latestExerciseSetNote || "",
            })),
         })),
      };

      return res.status(200).json({ completedWorkout });
   } catch (error) {
      return next(error);
   }
};

export const getUserWorkouts = async (req, res, next) => {
   try {
      const { userId } = req;

      const completedWorkouts = await getCompletedWorkoutByUserId(userId);

      return res.status(200).json({ completedWorkouts });
   } catch (error) {
      return next(error);
   }
};

export const getCompletedWorkout = async (req, res, next) => {
   try {
      const { completedWorkoutId } = req.params;

      const completedWorkout = await getCompletedWorkoutByCompletedWorkoutId(
         completedWorkoutId
      );

      if (!completedWorkout) {
         return res
            .status(404)
            .json({ message: "Completed workout not found" });
      }

      const completedExercises = await getCompletedExerciseByCompletedWorkoutId(
         completedWorkoutId
      );

      const completedExercisesWithSets = await Promise.all(
         completedExercises.map(async (exercise) => {
            const completedExerciseSets =
               await getCompletedExerciseSetsByCompletedExerciseId(
                  exercise.completedExerciseId
               );

            return {
               ...exercise,
               completedExerciseSets,
            };
         })
      );

      completedWorkout.completedExercises = completedExercisesWithSets;

      return res.status(200).json({ completedWorkout });
   } catch (error) {
      return next(error);
   }
};

export const createCompletedWorkoutController = async (req, res, next) => {
   try {
      const { userId } = req;
      const { completedWorkout } = req.body;

      const completedWorkoutId = await createCompletedWorkout({
         userId,
         completedWorkout,
      });

      for (const completedExercise of completedWorkout.completedExercises) {
         const completedExerciseId = await createCompletedExercise({
            completedWorkoutId,
            userId,
            completedExercise,
         });

         const currentExercises = await getExerciseByExerciseId({
            exerciseId: completedExercise.exerciseId,
         });

         const updatedExercise = {
            ...currentExercises[0],
            latestExerciseNote: completedExercise.completedExerciseNotes,
         };

         await updateExercise(updatedExercise);

         for (const completedExerciseSet of completedExercise.completedExerciseSets) {
            await createCompletedExerciseSet({
               completedExerciseId,
               completedExerciseSet,
            });

            const currentExerciseSets = await getExerciseSetByExerciseSetId({
               exerciseSetId: completedExerciseSet.exerciseSetId,
            });

            const updatedExerciseSet = {
               ...currentExerciseSets[0],
               reps: completedExerciseSet.completedReps,
               weight: completedExerciseSet.completedWeight,
               latestExerciseSetNote:
                  completedExerciseSet.completedExerciseSetNotes,
            };

            await updateExerciseSet(updatedExerciseSet);
         }
      }

      return res
         .status(201)
         .json({ message: "Completed workout created successfully" });
   } catch (error) {
      return next(error);
   }
};

export const updateCompletedWorkoutController = async (req, res, next) => {
   try {
      const { completedWorkout } = req.body;

      for (const completedExercise of completedWorkout.completedExercises) {
         await updateCompletedExercise({ completedExercise });

         for (const completedExerciseSet of completedExercise.completedExerciseSets) {
            await updateCompletedExerciseSet({ completedExerciseSet });
         }
      }

      return res
         .status(200)
         .json({ message: "Completed workout updated successfully" });
   } catch (error) {
      return next(error);
   }
};

export const deleteCompletedWorkoutController = async (req, res, next) => {
   try {
      const { completedWorkoutId } = req.params;

      // db will cascade delete completed exercises and sets
      await deleteCompletedWorkoutByCompletedWorkoutId(completedWorkoutId);

      return res
         .status(200)
         .json({ message: "Completed workout deleted successfully" });
   } catch (error) {
      return next(error);
   }
};
