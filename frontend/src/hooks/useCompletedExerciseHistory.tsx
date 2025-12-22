import { useEffect } from "react";
import { toast } from "react-toastify";
import { formatErrorMessage } from "../utils/formatting.utils";
import { useAuthStore } from "../stores/auth.stores";
import { useCompletedExerciseHistoryStore } from "../stores/completed-exercise-history.stores";
import { fetchGetCompletedExercisesHistory } from "../services/completed-exercise.services";

export const useCompletedExerciseHistory = () => {
   // stores
   const token = useAuthStore((state) => state.token);
   const completedExerciseHistory = useCompletedExerciseHistoryStore(
      (state) => state.completedExerciseHistory
   );
   const isCompletedExerciseHistoryLoading = useCompletedExerciseHistoryStore(
      (state) => state.isLoading
   );
   const setCompletedExerciseHistory = useCompletedExerciseHistoryStore(
      (state) => state.setCompletedExerciseHistory
   );
   const setIsLoading = useCompletedExerciseHistoryStore(
      (state) => state.setIsLoading
   );

   // effect functions
   const getCompletedExerciseHistory = async () => {
      try {
         setIsLoading(true);

         const response = await fetchGetCompletedExercisesHistory(token!);

         setCompletedExerciseHistory(response.completedExerciseHistory);
      } catch (error) {
         console.error(error);

         const message = formatErrorMessage(error);

         toast.error(message);
      } finally {
         setIsLoading(false);
      }
   };

   // effects
   useEffect(() => {
      if (token) {
         getCompletedExerciseHistory();
      }
   }, [token]);

   return {
      isCompletedExerciseHistoryLoading,
      completedExerciseHistory,
      getCompletedExerciseHistory,
   };
};
