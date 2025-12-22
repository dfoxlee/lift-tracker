import { create } from "zustand";

interface TimerStore {
   timer: number;
   timerEvent:
      | "Started"
      | "Paused"
      | "Restarted"
      | "Exercise Completed"
      | "Set Completed"
      | "Workout Completed!"
      | null;
   intervalId: number | null;
   timerState: "running" | "paused" | "stopped";
   startTimer: () => void;
   completeWorkout: () => void;
   resetTimer: () => void;
   stopTimer: () => void;
   pauseTimer: () => void;
   setTimerEvent: (
      event:
         | "Started"
         | "Paused"
         | "Restarted"
         | "Exercise Completed"
         | "Set Completed"
         | "Workout Completed!"
         | null
   ) => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
   timer: 0,
   timerEvent: null,
   intervalId: null,
   timerState: "stopped",

   startTimer: () => {
      if (get().timerState === "running") return;

      const intervalId = setInterval(() => {
         set(({ timer }) => ({
            timer: timer + 1,
         }));
      }, 1000);

      set({ intervalId, timerState: "running", timerEvent: "Started" });
   },

   stopTimer: () => {
      const intervalId = get().intervalId;

      if (intervalId) {
         clearInterval(intervalId);
      }

      set({
         timer: 0,
         timerState: "stopped",
         intervalId: null,
         timerEvent: null,
      });
   },

   completeWorkout: () => {
      const intervalId = get().intervalId;

      if (intervalId) {
         clearInterval(intervalId);
      }

      set({
         timer: 0,
         timerState: "stopped",
         intervalId: null,
         timerEvent: "Workout Completed!",
      });
   },

   resetTimer: () => set({ timer: 0 }),

   pauseTimer: () => {
      const intervalId = get().intervalId;

      if (intervalId) {
         clearInterval(intervalId);
      }

      set({ timerState: "paused", intervalId: null, timerEvent: "Paused" });
   },

   setTimerEvent: (event) => set({ timerEvent: event }),
}));
