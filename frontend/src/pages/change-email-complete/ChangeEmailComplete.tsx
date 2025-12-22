import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./ChangeEmailComplete.module.css";

export default function ChangeEmailComplete() {
   return (
      <div className={styles.container}>
         <h1 className={styles.thankYou}>All Set!</h1>
         <FaEnvelope className={styles.messageIcon} />
         <h2 className={styles.title}>Your email request has been received.</h2>
         <p className={styles.subtitle}>
            You should receive an email confirmation shortly.
         </p>
         <Link className={styles.returnLink} to="/">
            Return Home
         </Link>
      </div>
   );
}
