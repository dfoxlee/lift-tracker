import { useModalsStore } from "../../../stores/modals.stores";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.stores";
import { useMemo, type ChangeEvent } from "react";

import styles from "./CompletedExerciseNotesModal.module.css";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaTimes } from "react-icons/fa";

export default function CompletedExerciseNotesModal() {
   // stores
   const setCurrentCompletedExerciseNotesOrder = useModalsStore(
      (state) => state.setCurrentCompletedExerciseNotesOrder
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const currentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseOrder
   );

   // memoized values
   const currentCompletedExercise = useMemo(() => {
      return (
         completedWorkout?.completedExercises?.find(
            (exercise) =>
               exercise.completedExerciseOrder === currentCompletedExerciseOrder
         ) || null
      );
   }, [completedWorkout, currentCompletedExerciseOrder]);

   // handlers
   const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newNote = e.target.value;

      if (!completedWorkout || !currentCompletedExercise) return;

      const updatedCompletedExercises =
         completedWorkout?.completedExercises?.map((exercise) => {
            if (
               exercise.completedExerciseOrder === currentCompletedExerciseOrder
            ) {
               return {
                  ...exercise,
                  completedExerciseNotes: newNote,
               };
            }
            return exercise;
         });

      setCompletedWorkout({
         ...completedWorkout,
         completedExercises: updatedCompletedExercises,
      });
   };

   const handleCloseModalClick = () => {
      setCurrentCompletedExerciseNotesOrder(null);
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardIconBtn Icon={FaTimes} onClick={handleCloseModalClick} />
            <h3 className={styles.title}>Add An Exercise Note</h3>
            <input
               type="text"
               className={styles.noteInput}
               placeholder={"Exercise note..."}
               value={currentCompletedExercise?.completedExerciseNotes ?? ""}
               onChange={handleNoteChange}
            />
            {currentCompletedExercise?.latestExerciseNote && (
               <p className={styles.latestExerciseNote}>{`Latest Note: ${currentCompletedExercise?.latestExerciseNote}`}</p>
            )}
         </div>
      </div>
   );
}
