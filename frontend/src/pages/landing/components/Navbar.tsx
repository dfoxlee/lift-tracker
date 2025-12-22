import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import AuthModal from "./AuthModal";
import StandardIconBtn from "../../shared/StandardIconBtn";
import { FaUser } from "react-icons/fa";
import StandardBtn from "../../shared/StandardBtn";

export default function Navbar() {
   // states
   const [authModalType, setAuthModalType] = useState<
      "login" | "signup" | null
   >(null);

   // refs
   const authModalRef = useRef<HTMLDivElement>(null);

   // effects
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            authModalRef.current &&
            !authModalRef.current.contains(event.target as Node)
         ) {
            setAuthModalType(null);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   // handlers
   const handleLoginClick = () => {
      setAuthModalType((prev) => (prev === "login" ? null : "login"));
   };

   const handleSignUpClick = () => {
      setAuthModalType((prev) => (prev === "signup" ? null : "signup"));
   };

   const closeModal = () => {
      setAuthModalType(null);
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <h1 className={styles.title}>LiftTracker</h1>
            <div className={styles.authBtnsWrapper} ref={authModalRef}>
               <StandardBtn text="Login" onClick={handleLoginClick} />
               <StandardBtn text="Sign Up" onClick={handleSignUpClick} />
               {authModalType ? (
                  <AuthModal authType={authModalType} closeModal={closeModal} />
               ) : null}
            </div>
         </div>
      </div>
   );
}
