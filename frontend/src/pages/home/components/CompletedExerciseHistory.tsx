import Loading from "../../shared/Loading";
import Seperator from "../../shared/Seperator";
import CompletedExerciseChart from "./CompletedExerciseChart";
import { useCompletedExerciseHistory } from "../../../hooks/useCompletedExerciseHistory";

import styles from "./CompletedExerciseHistory.module.css";

export default function CompletedExerciseHistory() {
   // hooks
   const { isCompletedExerciseHistoryLoading, completedExerciseHistory } =
      useCompletedExerciseHistory();

   return (
      <div className={styles.container}>
         <h2 className={styles.title}>Completed Exercise History</h2>
         <Seperator />
         {isCompletedExerciseHistoryLoading ? (
            <Loading variant="dots" size="large" />
         ) : (
            <CompletedExerciseChart
               completedExerciseHistory={completedExerciseHistory}
            />
         )}
      </div>
   );
}
