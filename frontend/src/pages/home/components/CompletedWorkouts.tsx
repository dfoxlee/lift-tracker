import { useNavigate } from "react-router-dom";
import { useCompletedWorkouts } from "../../../hooks/useCompletedWorkouts";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.stores";
import Loading from "../../shared/Loading";
import Seperator from "../../shared/Seperator";
import WorkoutCard from "./WorkoutCard";

import styles from "./CompletedWorkouts.module.css";

export default function CompletedWorkouts() {
   // stores
   const setDeleteCompletedWorkoutId = useCompletedWorkoutStore(
      (state) => state.setDeleteCompletedWorkoutId
   );
   const setViewCompletedWorkoutId = useCompletedWorkoutStore(
      (state) => state.setViewCompletedWorkoutId
   );

   // hooks
   const { isLoading, completedWorkouts } = useCompletedWorkouts();
   const navigate = useNavigate();

   // handlers
   const handleViewCompletedWorkout = (completedWorkoutId: number) => {
      setViewCompletedWorkoutId(completedWorkoutId);
   };

   const handleEditCompletedWorkout = (completedWorkoutId: number) => {
      navigate(
         `/home/completed-workout/composition/completed/${completedWorkoutId}`
      );
   };

   const handleDeleteCompletedWorkout = (completedWorkoutId: number) => {
      setDeleteCompletedWorkoutId(completedWorkoutId);
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.title}>Completed Workouts</h2>
         <Seperator />
         <div className={styles.completedWorkoutsWrapper}>
            {isLoading ? (
               <Loading size="large" variant="dots" />
            ) : completedWorkouts.length > 0 ? (
               completedWorkouts.map((workout) => (
                  <WorkoutCard
                     key={workout.completedWorkoutId}
                     workoutId={workout.completedWorkoutId!}
                     workoutName={workout.completedWorkoutName}
                     completedDate={workout.completedDate}
                     onView={handleViewCompletedWorkout}
                     onEdit={handleEditCompletedWorkout}
                     onDelete={handleDeleteCompletedWorkout}
                  />
               ))
            ) : (
               <h4 className={styles.noWorkoutText}>No Completed Workouts</h4>
            )}
         </div>
      </div>
   );
}
