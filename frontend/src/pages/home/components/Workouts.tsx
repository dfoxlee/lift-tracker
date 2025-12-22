import { useWorkouts } from "../../../hooks/useWorkouts";
import Seperator from "../../shared/Seperator";
import Loading from "../../shared/Loading";
import WorkoutCard from "./WorkoutCard";
import { useNavigate } from "react-router-dom";
import { useWorkoutStore } from "../../../stores/workout.stores";

import styles from "./Workouts.module.css";

export default function Workouts() {
   // stores
   const setViewWorkoutId = useWorkoutStore((state) => state.setViewWorkoutId);
   const setDeleteWorkoutId = useWorkoutStore(
      (state) => state.setDeleteWorkoutId
   );

   // hooks
   const { workouts, isLoading } = useWorkouts();
   const navigate = useNavigate();

   const handleStartWorkout = (workoutId: number) => {
      navigate(`/home/completed-workout/composition/${workoutId}`);
   };

   const handleViewWorkout = (workoutId: number) => {
      setViewWorkoutId(workoutId);
   };

   const handleEditWorkout = (workoutId: number) => {
      navigate(`/home/workout/composition/${workoutId}`);
   };

   const handleDeleteWorkout = (workoutId: number) => {
      setDeleteWorkoutId(workoutId);
   };

   return (
      <div className={styles.container}>
         <h2>My Workouts</h2>
         <Seperator />
         <div className={styles.workoutsWrapper}>
            {isLoading ? (
               <Loading />
            ) : workouts.length > 0 ? (
               workouts.map((w) => (
                  <WorkoutCard
                     key={w.workoutId}
                     workoutId={w.workoutId!}
                     workoutName={w.workoutName}
                     onStart={handleStartWorkout}
                     onEdit={handleEditWorkout}
                     onView={handleViewWorkout}
                     onDelete={handleDeleteWorkout}
                  />
               ))
            ) : (
               <h4 className={styles.noWorkoutText}>No Workouts</h4>
            )}
         </div>
      </div>
   );
}
