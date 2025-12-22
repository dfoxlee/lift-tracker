export interface ExerciseSetType {
   exerciseSetId?: number;
   exerciseId?: number;
   exerciseSetOrder: number;
   reps: number;
   weight: number;
   weightUnitId: number;
   latestExerciseSetNote?: string;
}
