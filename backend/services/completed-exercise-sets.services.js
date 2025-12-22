import pool from "../db/db-config.js";

export const getCompletedExerciseSetByCompletedExerciseSetId = async (
   completedExerciseSetId
) => {
   const query = `
      select completed_exercise_set_id as completedExerciseSetId,
         completed_exercise_id as completedExerciseId,
         completed_exercise_set_order as completedExerciseSetOrder,
         completed_reps as completedReps,
         completed_weight as completedWeight,
         completed_weight_unit_id as completedWeightUnitId,
         completed_exercise_set_notes as completedExerciseSetNotes,
         is_completed as isCompleted
      from completed_exercise_set
      where completed_exercise_set_id = ?;
   `;

   const values = [completedExerciseSetId];

   const [results] = await pool.execute(query, values);

   return results;
}

export const getCompletedExerciseSetsByCompletedExerciseId = async (
   completedExerciseId
) => {
   const query = `
      select completed_exercise_set_id as completedExerciseSetId,
         completed_exercise_id as completedExerciseId,
         completed_exercise_set_order as completedExerciseSetOrder,
         completed_reps as completedReps,
         completed_weight as completedWeight,
         completed_weight_unit_id as completedWeightUnitId,
         completed_exercise_set_notes as completedExerciseSetNotes,
         is_completed as isCompleted
      from completed_exercise_set
      where completed_exercise_id = ?
      order by completed_exercise_set_order;
   `;

   const values = [completedExerciseId];

   const [results] = await pool.execute(query, values);

   return results;
};

export const createCompletedExerciseSet = async ({
   completedExerciseId,
   completedExerciseSet,
}) => {
   const query = `
      insert into completed_exercise_set (completed_exercise_id, completed_exercise_set_order, completed_reps, completed_weight, completed_weight_unit_id, completed_exercise_set_notes, is_completed)
      values (?, ?, ?, ?, ?, ?, ?);
   `;

   const values = [
      completedExerciseId,
      completedExerciseSet.completedExerciseSetOrder,
      completedExerciseSet.completedReps,
      completedExerciseSet.completedWeight,
      completedExerciseSet.completedWeightUnitId,
      completedExerciseSet.completedExerciseSetNotes,
      completedExerciseSet.isCompleted,
   ];

   const [result] = await pool.execute(query, values);

   return result.insertId;
};

export const updateCompletedExerciseSet = async ({ completedExerciseSet }) => {
   const query = `
      update completed_exercise_set
      set completed_reps = ?,
          completed_weight = ?,
          completed_weight_unit_id = ?,
          completed_exercise_set_notes = ?,
          is_completed = ?
      where completed_exercise_set_id = ?;
   `;

   const values = [
      completedExerciseSet.completedReps,
      completedExerciseSet.completedWeight,
      completedExerciseSet.completedWeightUnitId,
      completedExerciseSet.completedExerciseSetNotes,
      completedExerciseSet.isCompleted,
      completedExerciseSet.completedExerciseSetId,
   ];

   await pool.execute(query, values);

   return;
};

export const deleteCompletedExerciseSetsByCompletedExerciseId = async (
   completedExerciseId
) => {
   const query = `
      delete from completed_exercise_set
      where completed_exercise_id = ?;
   `;

   const values = [completedExerciseId];

   await pool.execute(query, values);
};

export const deleteCompletedExerciseSetByCompletedExerciseSetId = async (
   completedExerciseSetId
) => {
   const query = `
      delete from completed_exercise_set
      where completed_exercise_set_id = ?;
   `;

   const values = [completedExerciseSetId];

   await pool.execute(query, values);
};
