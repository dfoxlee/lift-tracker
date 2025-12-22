import { FaTimes } from "react-icons/fa";
import { useModalsStore } from "../../../stores/modals.stores";
import { useCompletedWorkoutStore } from "../../../stores/completed-workout.stores";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { useMemo, type ChangeEvent } from "react";

import styles from "./CompletedExerciseSetNotesModal.module.css";

export default function CompletedExerciseSetNotesModal() {
   // stores
   const currentCompletedExerciseSetNotesOrder = useModalsStore(
      (state) => state.currentCompletedExerciseSetNotesOrder
   );
   const setCurrentCompletedExerciseSetNotesOrder = useModalsStore(
      (state) => state.setCurrentCompletedExerciseSetNotesOrder
   );
   const currentCompletedExerciseOrder = useCompletedWorkoutStore(
      (state) => state.currentCompletedExerciseOrder
   );
   const completedWorkout = useCompletedWorkoutStore(
      (state) => state.completedWorkout
   );
   const setCompletedWorkout = useCompletedWorkoutStore(
      (state) => state.setCompletedWorkout
   );

   // memoized values
   const currentSet = useMemo(() => {
      const exercise = completedWorkout?.completedExercises?.find(
         (exercise) =>
            exercise.completedExerciseOrder === currentCompletedExerciseOrder
      );

      return exercise?.completedExerciseSets?.find(
         (set) =>
            set.completedExerciseSetOrder ===
            currentCompletedExerciseSetNotesOrder
      );
   }, [
      completedWorkout,
      currentCompletedExerciseSetNotesOrder,
      currentCompletedExerciseOrder,
   ]);

   // handlers
   const handleCloseModalClick = () => {
      setCurrentCompletedExerciseSetNotesOrder(null);
   };

   const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newNote = e.target.value;

      const updatedCompletedExercises =
         completedWorkout?.completedExercises?.map((exercise) => {
            if (
               exercise.completedExerciseOrder === currentCompletedExerciseOrder
            ) {
               const updatedSets = exercise.completedExerciseSets.map((set) => {
                  if (
                     set.completedExerciseSetOrder ===
                     currentCompletedExerciseSetNotesOrder
                  ) {
                     return {
                        ...set,
                        completedExerciseSetNotes: newNote,
                     };
                  }
                  return set;
               });

               return {
                  ...exercise,
                  completedExerciseSets: updatedSets,
               };
            }

            return exercise;
         });

      if (!completedWorkout) return;

      setCompletedWorkout({
         ...completedWorkout,
         completedExercises: updatedCompletedExercises,
      });
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardIconBtn Icon={FaTimes} onClick={handleCloseModalClick} />
            <h3 className={styles.title}>Add A Set Note</h3>
            <input
               type="text"
               className={styles.noteInput}
               placeholder={"Set note..."}
               value={currentSet?.completedExerciseSetNotes ?? ""}
               onChange={handleNoteChange}
            />
            {currentSet?.latestExerciseSetNote && (
               <p
                  className={styles.latestExerciseNote}
               >{`Latest Note: ${currentSet?.latestExerciseSetNote}`}</p>
            )}
         </div>
      </div>
   );
}
