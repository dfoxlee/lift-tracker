import { create } from "zustand";
import type { WorkoutType } from "../types/workout.types";

interface WorkoutState {
   workout: WorkoutType;
   workouts: WorkoutType[];
   isLoading: boolean;
   viewWorkoutId: number | null;
   deleteWorkoutId: number | null;
   currentExerciseOrder: number;
   viewWorkoutMode: "details" | "overview";
   setWorkout: (workout: WorkoutType) => void;
   setWorkouts: (workouts: WorkoutType[]) => void;
   setViewWorkoutId: (viewWorkoutId: number | null) => void;
   setDeleteWorkoutId: (deleteWorkoutId: number | null) => void;
   resetWorkout: () => void;
   toggleViewWorkoutMode: () => void;
   setCurrentExerciseOrder: (currentExerciseOrder: number) => void;
   setIsLoading: (isLoading: boolean) => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
   workout: {
      workoutName: "",
      exercises: [
         {
            exerciseOrder: 1,
            exerciseName: "",
            exerciseSets: [
               {
                  exerciseSetOrder: 1,
                  reps: 0,
                  weight: 0,
                  weightUnitId: 1,
               },
            ],
         },
      ],
   },
   workouts: [],
   isLoading: false,
   viewWorkoutId: null,
   deleteWorkoutId: null,
   currentExerciseOrder: 1,
   viewWorkoutMode: "details",

   setWorkout: (workout: WorkoutType) => set({ workout }),

   setWorkouts: (workouts: WorkoutType[]) => set({ workouts }),

   setViewWorkoutId: (viewWorkoutId: number | null) => set({ viewWorkoutId }),

   setDeleteWorkoutId: (deleteWorkoutId: number | null) =>
      set({ deleteWorkoutId }),

   resetWorkout: () =>
      set({
         currentExerciseOrder: 1,
         viewWorkoutMode: "details",
         viewWorkoutId: null,
         deleteWorkoutId: null,
         workout: {
            workoutName: "",
            exercises: [
               {
                  exerciseOrder: 1,
                  exerciseName: "",
                  exerciseSets: [
                     {
                        exerciseSetOrder: 1,
                        reps: 0,
                        weight: 0,
                        weightUnitId: 1,
                     },
                  ],
               },
            ],
         },
      }),

   toggleViewWorkoutMode: () =>
      set((state) => ({
         viewWorkoutMode:
            state.viewWorkoutMode === "details" ? "overview" : "details",
      })),

   setCurrentExerciseOrder: (currentExerciseOrder: number) =>
      set({ currentExerciseOrder }),

   setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
