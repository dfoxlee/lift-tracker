import { getCompletedExerciseSetsByCompletedExerciseId } from "../services/completed-exercise-sets.services.js";
import { getUserCreatedExercisesWithCompletedDate } from "../services/completed-exercises.services.js";
import { debugLogger } from "../utils/debug-logger.utils.js";

export const getCompletedExercisesHistory = async (req, res, next) => {
   try {
      const { userId } = req;

      const exercises = await getUserCreatedExercisesWithCompletedDate(userId);

      const exercisesWithSets = await Promise.all(
         exercises.map(async (exercise) => {
            const completedExerciseSets =
               await getCompletedExerciseSetsByCompletedExerciseId(
                  exercise.completedExerciseId
               );

            const completedExerciseSetsWithCompletedDate =
               completedExerciseSets.map((set) => ({
                  ...set,
                  completedDate: exercise.completedDate,
               }));

            return {
               ...exercise,
               completedExerciseSets: completedExerciseSetsWithCompletedDate,
            };
         })
      );

      const exerciseNames = exercises.map(
         (exercise) => exercise.completedExerciseName
      );

      const uniqueExerciseNames = [...new Set(exerciseNames)];

      const completedExerciseHistory = uniqueExerciseNames.map((name) => ({
         completedExerciseName: name,
         completedExerciseSets: exercisesWithSets
            .filter((exercise) => exercise.completedExerciseName === name)
            .map((exercise) => exercise.completedExerciseSets)
            .flat(),
      }));

      res.status(200).json({ completedExerciseHistory });
   } catch (error) {
      next(error);
   }
};
