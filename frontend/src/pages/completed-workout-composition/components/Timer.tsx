import { useEffect } from "react";
import { useTimerStore } from "../../../stores/timer.stores";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaPause, FaPlay, FaRedo } from "react-icons/fa";
import { formatTimer } from "../../../utils/formatting.utils";

import styles from "./Timer.module.css";

export default function Timer() {
   // stores
   const {
      timer,
      timerEvent,
      startTimer,
      pauseTimer,
      stopTimer,
      resetTimer,
      timerState,
   } = useTimerStore();

   // effects
   useEffect(() => {
      startTimer();

      return () => {
         stopTimer();
      };
   }, []);

   // handlers
   const handlePauseClick = () => {
      pauseTimer();
   };

   const handlePlayClick = () => {
      startTimer();
   };

   const handleResetClick = () => {
      resetTimer();
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.timer}>{formatTimer(timer)}</h2>
         <div className={styles.controlsWrapper}>
            <span className={styles.timerEvent}>{timerEvent}</span>
            <div className={styles.btnsWrapper}>
               {timerState !== "running" && (
                  <StandardIconBtn Icon={FaPlay} onClick={handlePlayClick} />
               )}
               {timerState === "running" && (
                  <StandardIconBtn Icon={FaPause} onClick={handlePauseClick} />
               )}
               <StandardIconBtn Icon={FaRedo} onClick={handleResetClick} />
            </div>
         </div>
      </div>
   );
}
