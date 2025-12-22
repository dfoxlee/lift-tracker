import { Link } from "react-router-dom";
import styles from "./AccountDeleted.module.css";

export default function AccountDeleted() {
   return (
      <div className={styles.container}>
         <h1 className={styles.title}>Sorry to see you go.</h1>
         <div className={styles.messagesWrapper}>
            <p className={styles.message}>
               Your account has been successfully deleted.
            </p>
            <p className={styles.message}>You are welcome back anytime.</p>
         </div>
         <div className={styles.linkWrapper}>
            <Link className={styles.returnLink} to="/">
               Return Home
            </Link>
         </div>
      </div>
   );
}
