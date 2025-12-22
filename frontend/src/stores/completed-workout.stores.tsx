import { create } from "zustand";
import type { CompletedWorkoutType } from "../types/completed-workout.types";

interface CompletedWorkoutStore {
   viewCompletedWorkoutId: number | null;
   completedWorkouts: CompletedWorkoutType[];
   completedWorkout: CompletedWorkoutType | null;
   currentCompletedExerciseOrder: number;
   currentCompletedExerciseSetOrder: number;
   workoutViewType: "details" | "overview";
   deleteCompletedWorkoutId: number | null;
   isWorkoutCompleted: boolean;

   setViewCompletedWorkoutId: (completedWorkoutId: number | null) => void;
   setCompletedWorkouts: (workouts: CompletedWorkoutType[]) => void;
   setCompletedWorkout: (workout: CompletedWorkoutType | null) => void;
   setCurrentCompletedExerciseOrder: (order: number) => void;
   setCurrentCompletedExerciseSetOrder: (order: number) => void;
   setWorkoutViewType: (viewType: "details" | "overview") => void;
   resetCompletedWorkoutStore: () => void;
   setDeleteCompletedWorkoutId: (
      deleteCompletedWorkoutId: number | null
   ) => void;
   setIsWorkoutCompleted: (isCompleted: boolean) => void;
}

export const useCompletedWorkoutStore = create<CompletedWorkoutStore>(
   (set) => ({
      viewCompletedWorkoutId: null,
      completedWorkouts: [],
      completedWorkout: null,
      currentCompletedExerciseOrder: 1,
      currentCompletedExerciseSetOrder: 1,
      workoutViewType: "details",
      deleteCompletedWorkoutId: null,
      isWorkoutCompleted: false,

      setViewCompletedWorkoutId: (completedWorkoutId) =>
         set(() => ({
            viewCompletedWorkoutId: completedWorkoutId,
         })),

      setCompletedWorkouts: (workouts) =>
         set(() => ({
            completedWorkouts: workouts,
         })),

      setCompletedWorkout: (workout) =>
         set(() => ({
            completedWorkout: workout,
         })),

      setCurrentCompletedExerciseOrder: (order) =>
         set(() => ({
            currentCompletedExerciseOrder: order,
         })),

      setCurrentCompletedExerciseSetOrder: (order) =>
         set(() => ({
            currentCompletedExerciseSetOrder: order,
         })),

      setWorkoutViewType: (viewType) =>
         set(() => ({
            workoutViewType: viewType,
         })),

      resetCompletedWorkoutStore: () =>
         set({
            viewCompletedWorkoutId: null,
            completedWorkouts: [],
            completedWorkout: null,
            currentCompletedExerciseOrder: 1,
            currentCompletedExerciseSetOrder: 1,
            workoutViewType: "details",
         }),

      setDeleteCompletedWorkoutId: (deleteCompletedWorkoutId) =>
         set(() => ({
            deleteCompletedWorkoutId,
         })),

      setIsWorkoutCompleted: (isCompleted) =>
         set(() => ({
            isWorkoutCompleted: isCompleted,
         })),
   })
);
