export interface CompletedExerciseSetType {
   exerciseId?: number;
   completedExerciseSetId?: number;
   completedExerciseId?: number;
   completedExerciseSetOrder: number;
   completedReps: number;
   completedWeight: number;
   completedWeightUnitId: number;
   isCompleted: boolean;
   latestExerciseSetNote?: string;
   completedExerciseSetNotes?: string;
}


export interface CompletedExerciseSetHistoryType {
   completedExerciseSetId: number;
   completedExerciseId: number;
   completedExerciseSetOrder: number;
   completedReps: number;
   completedWeight: string;
   completedWeightUnitId: number;
   completedExerciseSetNotes: string;
   isCompleted: number;
   completedDate: string;
}
