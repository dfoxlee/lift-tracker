import type { ExerciseSetType } from "./exercise-set.types";

export interface ExerciseType {
   exerciseId?: number;
   exerciseOrder: number;
   exerciseName: string;
   latestExerciseNote?: string;
   exerciseSets: ExerciseSetType[];
}
