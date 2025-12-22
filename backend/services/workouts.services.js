import pool from "../db/db-config.js";

export const findAllUserWorkouts = async ({ userId }) => {
   const query = `
      select workout_id as workoutId,
         workout_name as workoutName,
         created_date as createdDate
      from workout
      where user_id = ?
      order by created_date desc
   `;

   const values = [userId];

   const [results] = await pool.execute(query, values);

   return results;
};

export const findWorkoutById = async ({ workoutId }) => {
   const query = `
      select workout_id as workoutId,
         workout_name as workoutName,
         created_date as createdDate
      from workout
      where workout_id = ?
   `;

   const values = [workoutId];

   const [results] = await pool.execute(query, values);

   return results[0];
};

export const findAllStandardWorkouts = async () => {
   const query = `
      select standard_workout_id as standardWorkoutId,
         workout_name as workoutName,
         created_date as createdDate
      from workout
      where user_id is null
      order by created_date desc
   `;

   const [results] = await pool.execute(query);

   return results;
};

export const createWorkout = async ({ userId, workoutName, createdDate }) => {
   const query = `
      insert into workout (user_id, workout_name, created_date)
      values (?, ?, ?)
   `;

   const values = [userId, workoutName, createdDate];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Failed to create workout");
   }

   return results;
};

export const updateWorkout = async ({ workoutId, workoutName }) => {
   const query = `
      update workout
      set workout_name = ?
      where workout_id = ?
   `;

   const values = [workoutName, workoutId];

   const [results] = await pool.execute(query, values);

   return results;
};

export const deleteWorkout = async ({ workoutId }) => {
   const query = `
      delete from workout
      where workout_id = ?
   `;

   const values = [workoutId];

   const [results] = await pool.execute(query, values);

   return results;
};
