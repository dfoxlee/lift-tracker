import pool from "../db/db-config.js";

export const getExerciseByExerciseId = async ({ exerciseId }) => {
   const query = `
      select exercise_id as exerciseId,
         workout_id as workoutId,
         exercise_order as exerciseOrder,
         exercise_name as exerciseName,
         latest_exercise_note as latestExerciseNote
      from exercise
      where exercise_id = ?
      order by exercise_order asc
   `;

   const values = [exerciseId];

   const [results] = await pool.execute(query, values);

   return results;
};

export const getExercisesByWorkoutId = async ({ workoutId }) => {
   const query = `
      select exercise_id as exerciseId,
         workout_id as workoutId,
         exercise_order as exerciseOrder,
         exercise_name as exerciseName,
         latest_exercise_note as latestExerciseNote
      from exercise
      where workout_id = ?
      order by exercise_order asc
   `;

   const values = [workoutId];

   const [results] = await pool.execute(query, values);

   return results;
};

export const createExercise = async ({
   workoutId,
   exerciseOrder,
   exerciseName,
}) => {
   const query = `
      insert into exercise (workout_id, exercise_order, exercise_name)
      values (?, ?, ?)
   `;

   const values = [workoutId, exerciseOrder, exerciseName];
   const [result] = await pool.execute(query, values);

   if (!result.affectedRows) {
      throw new Error("Failed to create exercise");
   }

   return result;
};

export const updateExercise = async ({
   exerciseId,
   exerciseOrder,
   exerciseName,
   latestExerciseNote,
}) => {
   const query = `
      update exercise
      set exercise_order = ?,
          exercise_name = ?,
          latest_exercise_note = ?
      where exercise_id = ?
   `;

   const values = [exerciseOrder, exerciseName, latestExerciseNote, exerciseId];

   const [results] = await pool.execute(query, values);

   return results;
};

export const deleteExercise = async ({ exerciseId }) => {
   const query = `
      delete from exercise
      where exercise_id = ?
   `;

   const values = [exerciseId];

   const [results] = await pool.execute(query, values);

   return results;
};
