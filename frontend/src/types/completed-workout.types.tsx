import type { CompletedExerciseType } from "./completed-exercise.types";

export interface CompletedWorkoutType {
   completedWorkoutId?: number;
   completedWorkoutDate?: string;
   completedWorkoutName: string;
   completedDate?: Date | string | null;
   completedExercises?: CompletedExerciseType[];
}
