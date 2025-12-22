import type { ExerciseType } from "./exercise.types";

export interface WorkoutType {
   workoutId?: number;
   workoutName: string;
   createdDate?: Date | string | null;
   exercises?: ExerciseType[];
}
