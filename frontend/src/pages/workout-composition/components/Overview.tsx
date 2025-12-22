import { FaPlus } from "react-icons/fa";
import { useWorkoutStore } from "../../../stores/workout.stores";
import StandardBtn from "../../shared/StandardBtn";
import ExerciseOverview from "./ExerciseOverview";

import styles from "./Overview.module.css";

export default function Overview() {
   // stores
   const workout = useWorkoutStore((state) => state.workout);
   const setWorkout = useWorkoutStore((state) => state.setWorkout);

   // handlers
   const handleAddExerciseClick = () => {
      const newExercise = {
         exerciseOrder: workout.exercises ? workout.exercises.length + 1 : 1,
         exerciseName: "",
         exerciseSets: [
            {
               exerciseSetOrder: 1,
               reps: 0,
               weight: 0,
               weightUnitId: 1,
            },
         ],
      };

      const updatedWorkout = {
         ...workout,
         exercises: workout.exercises
            ? [...workout.exercises, newExercise]
            : [newExercise],
      };

      setWorkout(updatedWorkout);
   };

   return (
      <div className={styles.container}>
         <div className={styles.exercisesWrapper}>
            {workout.exercises &&
               workout.exercises.map((exercise) => (
                  <ExerciseOverview
                     key={exercise.exerciseOrder}
                     exercise={exercise}
                  />
               ))}
         </div>
         <StandardBtn
            LeftIcon={FaPlus}
            text="Exercise"
            onClick={handleAddExerciseClick}
         />
      </div>
   );
}
