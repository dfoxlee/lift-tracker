import { create } from "zustand";

interface ModalsState {
   currentCompletedExerciseNotesOrder: number | null;
   currentCompletedExerciseSetNotesOrder: number | null;
   setCurrentCompletedExerciseNotesOrder: (order: number | null) => void;
   setCurrentCompletedExerciseSetNotesOrder: (order: number | null) => void;
}

export const useModalsStore = create<ModalsState>((set) => ({
   currentCompletedExerciseNotesOrder: null,
   currentCompletedExerciseSetNotesOrder: null,

   setCurrentCompletedExerciseNotesOrder: (order) =>
      set(() => ({ currentCompletedExerciseNotesOrder: order })),
   
   setCurrentCompletedExerciseSetNotesOrder: (order) =>
      set(() => ({ currentCompletedExerciseSetNotesOrder: order })),
}));
