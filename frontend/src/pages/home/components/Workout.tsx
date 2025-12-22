import { FaGlasses, FaPencilAlt, FaRunning, FaTrash } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";

import styles from "./Workout.module.css";
import { useWorkoutStore } from "../../../stores/workout.stores";
import { useNavigate } from "react-router-dom";
import type { WorkoutType } from "../../../types/workout.types";

interface WorkoutProps {
   workout: WorkoutType;
}

export default function Workout({ workout }: WorkoutProps) {
   // stores
   const setViewWorkoutId = useWorkoutStore((state) => state.setViewWorkoutId);
   const setDeleteWorkoutId = useWorkoutStore(
      (state) => state.setDeleteWorkoutId
   );

   // hooks
   const navigate = useNavigate();

   // handlers
   const handleViewClick = () => {
      setViewWorkoutId(workout.workoutId ?? null);
   };

   const handleEditClick = () => {
      navigate(`/home/workout/composition/${workout.workoutId}`);
   };

   const handleStartClick = () => {
      navigate(`/home/completed-workout/composition/${workout.workoutId}`);
   };

   const handleDeleteClick = () => {
      setDeleteWorkoutId(workout.workoutId ?? null);
   };

   return (
      <div className={styles.container}>
         <h3 className={styles.workoutName}>{workout.workoutName}</h3>
         <div className={styles.btnWrapper}>
            <StandardIconBtn Icon={FaGlasses} onClick={handleViewClick} styleType="info" />
            <StandardIconBtn Icon={FaPencilAlt} onClick={handleEditClick} />
            <StandardIconBtn Icon={FaRunning} onClick={handleStartClick} styleType="success" />
            <StandardIconBtn
               Icon={FaTrash}
               onClick={handleDeleteClick}
               styleType="warning"
            />
         </div>
      </div>
   );
}
