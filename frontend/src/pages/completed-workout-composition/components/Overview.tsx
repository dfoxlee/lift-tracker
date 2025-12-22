import { useCompletedWorkoutStore } from "../../../stores/completed-workout.stores";
import CompletedExercise from "./CompletedExercise";

import styles from "./Overview.module.css";

export default function Overview() {
   // stores
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );

   return (
      <div className={styles.container}>
         {completedWorkout?.completedExercises?.map((e) => (
            <CompletedExercise completedExercise={e} />
         ))}
      </div>
   );
}
