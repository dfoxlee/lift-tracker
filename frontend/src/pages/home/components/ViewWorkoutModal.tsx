import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchGetWorkout } from "../../../services/workouts.services";
import { useAuthStore } from "../../../stores/auth.stores";
import { useWorkoutStore } from "../../../stores/workout.stores";
import {
   formatErrorMessage,
   formatExerciseSet,
} from "../../../utils/formatting.utils";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaTimes } from "react-icons/fa";
import Loading from "../../shared/Loading";

import styles from "./ViewWorkoutModal.module.css";

export default function ViewWorkoutModal() {
   // stores
   const viewWorkoutId = useWorkoutStore((state) => state.viewWorkoutId);
   const setViewWorkoutId = useWorkoutStore((state) => state.setViewWorkoutId);
   const setWorkout = useWorkoutStore((state) => state.setWorkout);
   const resetWorkout = useWorkoutStore((state) => state.resetWorkout);
   const workout = useWorkoutStore((state) => state.workout);
   const token = useAuthStore((state) => state.token);

   //states
   const [isLoading, setIsLoading] = useState(false);

   // effect functions
   const getWorkout = async () => {
      if (!viewWorkoutId) return;

      try {
         setIsLoading(true);
         const response = await fetchGetWorkout(viewWorkoutId, token!);

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
      getWorkout();
   }, [viewWorkoutId]);

   // handlers
   const handleCloseClick = () => {
      setViewWorkoutId(null);
      resetWorkout();
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            {isLoading ? (
               <Loading size="large" variant="dots" />
            ) : (
               <>
                  <StandardIconBtn Icon={FaTimes} onClick={handleCloseClick} />
                  <h3 className={styles.workoutName}>{workout.workoutName}</h3>
                  <div className={styles.exercisesWrapper}>
                     {workout?.exercises?.map((exercise) => (
                        <div
                           key={exercise.exerciseOrder!}
                           className={styles.exerciseCard}
                        >
                           <h4 className={styles.exerciseName}>
                              {`${exercise.exerciseOrder}. ${exercise.exerciseName}`}
                           </h4>
                           <p
                              className={styles.latestExerciseNote}
                           >{`Exercise Notes: ${
                              exercise.latestExerciseNote || "-"
                           }`}</p>
                           <div className={styles.exerciseSetsGrid}>
                              <h5 className={styles.setTitle}>set</h5>
                              <h5 className={styles.setTitle}>output</h5>
                              <h5 className={styles.setTitle}>latest note</h5>
                              {exercise.exerciseSets.map((set) => (
                                 <Fragment key={set.exerciseSetOrder}>
                                    <span className={styles.setInfo}>
                                       {set.exerciseSetOrder}
                                    </span>
                                    <span className={styles.setInfo}>
                                       {formatExerciseSet(set)}
                                    </span>
                                    <span className={styles.setInfo}>
                                       {set.latestExerciseSetNote || "-"}
                                    </span>
                                 </Fragment>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
