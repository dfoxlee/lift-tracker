import { create } from "zustand";
import type { CompletedExerciseHistoryType } from "../types/completed-exercise.types";

interface CompletedExerciseHistoryState {
   completedExerciseHistory: CompletedExerciseHistoryType[];
   isLoading: boolean;
   setCompletedExerciseHistory: (
      completedExerciseHistory: CompletedExerciseHistoryType[]
   ) => void;
   setIsLoading: (isLoading: boolean) => void;
}

export const useCompletedExerciseHistoryStore =
   create<CompletedExerciseHistoryState>((set) => ({
      completedExerciseHistory: [],
      isLoading: false,

      setCompletedExerciseHistory: (
         completedExerciseHistory: CompletedExerciseHistoryType[]
      ) => set({ completedExerciseHistory }),

      setIsLoading: (isLoading: boolean) => set({ isLoading }),
   }));
