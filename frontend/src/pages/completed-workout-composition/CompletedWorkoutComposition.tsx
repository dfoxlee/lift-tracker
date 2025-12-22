import { useNavigate, useParams } from "react-router-dom";
import { useCompletedWorkoutStore } from "../../stores/completed-workout.stores";
import { use, useEffect, useState } from "react";
import { useAuthStore } from "../../stores/auth.stores";
import {
   fetchCompletedWorkoutById,
   fetchCreateCompletedWorkout,
   fetchGetNewCompletedWorkout,
   fetchUpdateCompletedWorkout,
} from "../../services/completed-workout.services";
import { formatErrorMessage } from "../../utils/formatting.utils";
import { toast } from "react-toastify";
import Loading from "../shared/Loading";
import { FaToggleOff } from "react-icons/fa";
import StandardBtn from "../shared/StandardBtn";
import Details from "./components/Details";
import Timer from "./components/Timer";
import Overview from "./components/Overview";
import CompletedExerciseNotesModal from "./components/CompletedExerciseNotesModal";
import CompletedExerciseSetNotesModal from "./components/CompletedExerciseSetNotesModal";
import { useModalsStore } from "../../stores/modals.stores";

import styles from "./CompletedWorkoutComposition.module.css";

export default function CompletedWorkoutComposition() {
   // stores
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );
   const workoutViewType = useCompletedWorkoutStore(
      (state) => state.workoutViewType
   );
   const setWorkoutViewType = useCompletedWorkoutStore(
      (state) => state.setWorkoutViewType
   );
   const currentCompletedExerciseNotesOrder = useModalsStore(
      (state) => state.currentCompletedExerciseNotesOrder
   );
   const currentCompletedExerciseSetNotesOrder = useModalsStore(
      (state) => state.currentCompletedExerciseSetNotesOrder
   );
   const resetCompletedWorkoutStore = useCompletedWorkoutStore(
      (state) => state.resetCompletedWorkoutStore
   );
   const token = useAuthStore((state) => state.token);

   // states
   const [isLoading, setIsLoading] = useState(false);

   // hooks
   const params = useParams();
   const navigate = useNavigate();

   // constants
   const { workoutId, completedWorkoutId } = params;

   // effect functions
   const getNewCompletedWorkout = async () => {
      try {
         setIsLoading(true);

         const response = await fetchGetNewCompletedWorkout(workoutId!, token!);

         setCompletedWorkout(response.completedWorkout);
      } catch (error) {
         console.error(error);

         const message = formatErrorMessage(error);

         toast.error(message);
      } finally {
         setIsLoading(false);
      }
   };

   const getCompletedWorkout = async () => {
      try {
         setIsLoading(true);

         const response = await fetchCompletedWorkoutById(
            completedWorkoutId!,
            token!
         );

         setCompletedWorkout(response.completedWorkout);
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
      resetCompletedWorkoutStore();

      if (completedWorkoutId && token) {
         getCompletedWorkout();
      } else if (workoutId && token) {
         getNewCompletedWorkout();
      }
   }, []);

   // handlers
   const handleCancelClick = () => {
      navigate(-1);
   };

   const handleSaveWorkoutClick = async () => {
      try {
         setIsLoading(true);

         if (completedWorkoutId) {
            await fetchUpdateCompletedWorkout(completedWorkout!, token!);
         } else {
            await fetchCreateCompletedWorkout(completedWorkout!, token!);
         }

         setIsLoading(false);

         navigate("/home");
      } catch (error) {
         setIsLoading(false);

         console.error(error);

         const message = formatErrorMessage(error);

         toast.error(message);
      }
   };

   const handleToggleWorkoutViewClick = () => {
      setWorkoutViewType(
         workoutViewType === "details" ? "overview" : "details"
      );
   };

   return (
      <div className={styles.container}>
         {currentCompletedExerciseNotesOrder && <CompletedExerciseNotesModal />}
         {currentCompletedExerciseSetNotesOrder && (
            <CompletedExerciseSetNotesModal />
         )}
         {isLoading ? (
            <Loading variant="dots" size="large" />
         ) : (
            <>
               <div className={styles.headerWrapper}>
                  <StandardBtn
                     text="Cancel"
                     filled={false}
                     onClick={handleCancelClick}
                  />
                  <StandardBtn
                     text={completedWorkoutId ? "Update" : "Save"}
                     onClick={handleSaveWorkoutClick}
                  />
               </div>
               <h2 className={styles.workoutName}>
                  {completedWorkout?.completedWorkoutName}
               </h2>
               <button
                  className={styles.viewToggleBtn}
                  onClick={handleToggleWorkoutViewClick}
               >
                  <span
                     className={
                        workoutViewType === "details"
                           ? `${styles.viewToggleText} ${styles.viewToggleTextActive}`
                           : styles.viewToggleText
                     }
                  >
                     Details
                  </span>
                  <FaToggleOff className={styles.viewToggleIcon} />
                  <span
                     className={
                        workoutViewType === "overview"
                           ? `${styles.viewToggleText} ${styles.viewToggleTextActive}`
                           : styles.viewToggleText
                     }
                  >
                     Overview
                  </span>
               </button>
            </>
         )}
         {!completedWorkoutId && <Timer />}
         {workoutViewType === "details" ? <Details /> : <Overview />}
      </div>
   );
}
