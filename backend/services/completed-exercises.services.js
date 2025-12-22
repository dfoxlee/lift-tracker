import pool from "../db/db-config.js";

export const getCompletedExerciseByCompletedWorkoutId = async (workoutId) => {
   const query = `
      select completed_exercise_id as completedExerciseId,
         completed_workout_id as completedWorkoutId,
         completed_exercise_order as completedExerciseOrder,
         completed_exercise_name as completedExerciseName,
         completed_exercise_notes as completedExerciseNotes
      from completed_exercise
      where completed_workout_id = ?
      order by completed_exercise_order;
   `;

   const values = [workoutId];

   const [results] = await pool.execute(query, values);

   return results;
};

export const getUserCreatedExercisesWithCompletedDate = async (userId) => {
   const query = `
      select ce.completed_exercise_id as completedExerciseId,
         ce.completed_workout_id as completedWorkoutId,
         ce.completed_exercise_order as completedExerciseOrder,
         ce.completed_exercise_name as completedExerciseName,
         ce.completed_exercise_notes as completedExerciseNotes,
         cw.completed_date as completedDate
      from completed_exercise ce
      join completed_workout cw
         on ce.completed_workout_id = cw.completed_workout_id
      where ce.user_id = ?
      order by cw.completed_date desc, ce.completed_exercise_order
      limit 100;
   `;

   const values = [userId];

   const [results] = await pool.execute(query, values);

   return results;
};

export const createCompletedExercise = async ({
   completedWorkoutId,
   userId,
   completedExercise,
}) => {
   const query = `
      insert into completed_exercise (completed_workout_id, user_id, completed_exercise_order, completed_exercise_name, completed_exercise_notes)
      values (?, ?, ?, ?, ?);
   `;

   const values = [
      completedWorkoutId,
      userId,
      completedExercise.completedExerciseOrder,
      completedExercise.completedExerciseName,
      completedExercise.completedExerciseNotes,
   ];

   const [result] = await pool.execute(query, values);

   return result.insertId;
};

export const updateCompletedExercise = async ({ completedExercise }) => {
   const query = `
      update completed_exercise
      set completed_exercise_notes = ?
      where completed_exercise_id = ?;
   `;

   const values = [
      completedExercise.completedExerciseNotes,
      completedExercise.completedExerciseId,
   ];

   await pool.execute(query, values);

   return;
};

export const deleteCompletedExerciseByCompletedExerciseId = async (
   completedExerciseId
) => {
   const query = `
      delete from completed_exercise
      where completed_exercise_id = ?;
   `;

   const values = [completedExerciseId];

   await pool.execute(query, values);

   return;
};
