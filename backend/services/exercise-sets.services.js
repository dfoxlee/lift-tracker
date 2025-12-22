import pool from "../db/db-config.js";

export const getExerciseSetByExerciseSetId = async ({ exerciseSetId }) => {
   const query = `
      select exercise_set_id as exerciseSetId,
         exercise_id as exerciseId,
         exercise_set_order as exerciseSetOrder,
         reps,
         weight,
         weight_unit_id as weightUnitId,
         latest_exercise_set_note as latestExerciseSetNote
      from exercise_set
      where exercise_set_id = ?
   `;

   const values = [exerciseSetId];

   const [results] = await pool.execute(query, values);

   return results;
}

export const createExerciseSet = async ({
   exerciseId,
   exerciseSetOrder,
   reps,
   weight,
   weightUnitId,
}) => {
   const query = `
      insert into exercise_set (exercise_id, exercise_set_order, reps, weight, weight_unit_id)
      values (?, ?, ?, ?, ?);
      `;

   const values = [exerciseId, exerciseSetOrder, reps, weight, weightUnitId];

   const [result] = await pool.execute(query, values);

   if (!result.affectedRows) {
      throw new Error("Failed to create exercise set");
   }

   return result;
};

export const getExerciseSetsByExerciseId = async ({ exerciseId }) => {
   const query = `
      select exercise_set_id as exerciseSetId,
         exercise_id as exerciseId,
         exercise_set_order as exerciseSetOrder,
         reps,
         weight,
         weight_unit_id as weightUnitId,
         latest_exercise_set_note as latestExerciseSetNote
      from exercise_set
      where exercise_id = ?
      order by exercise_set_order asc
   `;

   const values = [exerciseId];

   const [results] = await pool.execute(query, values);

   return results;
};

export const updateExerciseSet = async ({
   exerciseSetOrder,
   reps,
   weight,
   weightUnitId,
   exerciseSetId,
   latestExerciseSetNote
}) => {
   const query = `
      update exercise_set
      set exercise_set_order = ?,
         reps = ?,
         weight = ?,
         weight_unit_id = ?,
         latest_exercise_set_note = ?
      where exercise_set_id = ?
   `;

   const values = [exerciseSetOrder, reps, weight, weightUnitId, latestExerciseSetNote, exerciseSetId];
   await pool.execute(query, values);

   return;
};

export const deleteExerciseSetById = async (exerciseSetId) => {
   const query = `
      delete from exercise_set
      where exercise_set_id = ?
   `;

   const values = [exerciseSetId];

   await pool.execute(query, values);

   return;
};
