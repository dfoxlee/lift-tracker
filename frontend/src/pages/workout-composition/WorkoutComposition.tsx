import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import Details from "./components/Details";
import Overview from "./components/Overview";
import StandardBtn from "../shared/StandardBtn";
import { useWorkoutStore } from "../../stores/workout.stores";
import {
   fetchCreateWorkout,
   fetchGetWorkout,
   fetchUpdateWorkout,
} from "../../services/workouts.services";
import { formatErrorMessage } from "../../utils/formatting.utils";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores/auth.stores";

import styles from "./WorkoutComposition.module.css";
import Loading from "../shared/Loading";

export default function WorkoutComposition() {
   // hooks
   const params = useParams();
   const navigate = useNavigate();

   // stores
   const workout = useWorkoutStore((state) => state.workout);
   const viewWorkoutMode = useWorkoutStore((state) => state.viewWorkoutMode);
   const setWorkout = useWorkoutStore((state) => state.setWorkout);
   const resetWorkout = useWorkoutStore((state) => state.resetWorkout);
   const toggleViewWorkoutMode = useWorkoutStore(
      (state) => state.toggleViewWorkoutMode
   );
   const token = useAuthStore((state) => state.token);

   // states
   const [isLoading, setIsLoading] = useState(false);

   // constants
   const workoutId = params.workoutId;

   // effect functions
   const getWorkout = async () => {
      try {
         setIsLoading(true);

         const response = await fetchGetWorkout(workoutId!, token!);

         setWorkout(response.workout);
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
      resetWorkout();

      if (workoutId && token) {
         getWorkout();
      }
   }, [workoutId, token]);

   // memoized values
   const isCreateWorkout = useMemo(() => !workoutId, [workoutId]);

   // handlers
   const handleCancelClick = () => {
      navigate(-1);
   };

   const handleSaveClick = async () => {
      if (workoutId) {
         await fetchUpdateWorkout(workout, token!);
      } else {
         try {
            await fetchCreateWorkout(workout, token!);
         } catch (error) {
            const message = formatErrorMessage(error);

            console.error(error);

            return toast.error(message);
         }
      }

      navigate(-1);
   };

   const handleWorkoutNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      const updatedWorkout = {
         ...workout,
         workoutName: event.target.value,
      };

      setWorkout(updatedWorkout);
   };

   const handleViewToggleClick = () => {
      toggleViewWorkoutMode();
   };

   return (
      <div className={styles.container}>
         {isLoading ? (
            <Loading />
         ) : (
            <>
               <div className={styles.headerBtnsWrapper}>
                  <StandardBtn
                     text="Cancel"
                     onClick={handleCancelClick}
                     filled={false}
                  />
                  <StandardBtn
                     text={isCreateWorkout ? "Create" : "Update"}
                     onClick={handleSaveClick}
                  />
               </div>
               <input
                  className={styles.workoutName}
                  type="text"
                  placeholder="Workout Name"
                  value={workout.workoutName}
                  onChange={handleWorkoutNameChange}
               />
               <button
                  className={styles.workoutViewToggleBtn}
                  onClick={handleViewToggleClick}
               >
                  <span
                     className={
                        viewWorkoutMode === "details"
                           ? `${styles.workoutViewToggleText} ${styles.workoutViewToggleTextActive}`
                           : styles.workoutViewToggleText
                     }
                  >
                     Details
                  </span>
                  {viewWorkoutMode === "details" ? (
                     <FaToggleOff className={styles.workoutViewToggleIcon} />
                  ) : (
                     <FaToggleOn className={styles.workoutViewToggleIcon} />
                  )}
                  <span
                     className={
                        viewWorkoutMode === "overview"
                           ? `${styles.workoutViewToggleText} ${styles.workoutViewToggleTextActive}`
                           : styles.workoutViewToggleText
                     }
                  >
                     Overview
                  </span>
               </button>
               {viewWorkoutMode === "details" ? <Details /> : <Overview />}
            </>
         )}
      </div>
   );
}
