import pool from "../db/db-config.js";

export const getCompletedWorkoutByCompletedWorkoutId = async (
   completedWorkoutId
) => {
   const query = `
      select completed_workout_id as completedWorkoutId,
         completed_workout_name as completedWorkoutName,
         completed_date as completedDate
      from completed_workout
      where completed_workout_id = ?;
   `;

   const values = [completedWorkoutId];

   const [results] = await pool.execute(query, values);

   return results[0];
};

export const getCompletedWorkoutByUserId = async (userId) => {
   const query = `
      select completed_workout_id as completedWorkoutId,
         completed_workout_name as completedWorkoutName,
         completed_date as completedDate
      from completed_workout
      where user_id = ?
      order by completed_date desc;
   `;

   const values = [userId];

   const [results] = await pool.execute(query, values);

   return results;
};

export const createCompletedWorkout = async ({ userId, completedWorkout }) => {
   const query = `
      insert into completed_workout (user_id, completed_workout_name)
      values (?, ?);
   `;

   const values = [userId, completedWorkout.completedWorkoutName];

   const [result] = await pool.execute(query, values);

   if (!result.affectedRows) {
      throw new Error("Failed to create completed workout");
   }

   return result.insertId;
};

export const deleteCompletedWorkoutByCompletedWorkoutId = async (
   completedWorkoutId
) => {
   const query = `
      delete from completed_workout
      where completed_workout_id = ?;
   `;

   const values = [completedWorkoutId];

   await pool.execute(query, values);
};
