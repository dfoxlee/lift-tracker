import type {
   CompletedExerciseSetType,
   CompletedExerciseSetHistoryType,
} from "./completed-exercise-set.types";

export interface CompletedExerciseType {
   exerciseId?: number;
   completedExerciseId?: number;
   completedWorkoutId?: number;
   completedExerciseOrder: number;
   completedExerciseName: string;
   latestExerciseNote?: string;
   completedExerciseNotes?: string;
   completedExerciseSets: CompletedExerciseSetType[];
}

export interface CompletedExerciseHistoryType {
   completedExerciseName: string;
   completedExerciseSets: CompletedExerciseSetHistoryType[];
}
