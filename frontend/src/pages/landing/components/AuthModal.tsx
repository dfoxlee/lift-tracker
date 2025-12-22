import { toast } from "react-toastify";
import { useAuthStore } from "../../../stores/auth.stores";
import { useState, type ChangeEvent } from "react";

import styles from "./AuthModal.module.css";
import { useNavigate } from "react-router-dom";
import {
   fetchLoginRequest,
   fetchSignUpRequest,
} from "../../../services/auth.services";
import { formatErrorMessage } from "../../../utils/formatting.utils";

export default function AuthModal({
   authType,
   closeModal,
}: {
   authType: "login" | "signup";
   closeModal: () => void;
}) {
   // hooks
   const navigate = useNavigate();

   // states
   const [emailInput, setEmailInput] = useState("");
   const [passwordInput, setPasswordInput] = useState("");
   const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   // stores
   const setToken = useAuthStore((state) => state.setToken);

   // handlers
   const handleLogin = async () => {
      try {
         setIsLoading(true);

         const response = await fetchLoginRequest({
            email: emailInput,
            password: passwordInput,
         });

         setToken(response.token);

         localStorage.setItem("lift-tracker", response.token);

         navigate("/home");
      } catch (error) {
         console.log(error);

         const message = formatErrorMessage(error);

         return toast.error(message);
      } finally {
         setIsLoading(false);
      }
   };

   const handleSignUp = async () => {
      try {
         setIsLoading(true);

         const response = await fetchSignUpRequest({
            email: emailInput,
            password: passwordInput,
         });

         console.log(response);

         navigate("/sign-up-complete");
      } catch (error) {
         console.log(error);

         const message = formatErrorMessage(error);

         return toast.error(message);
      } finally {
         setIsLoading(false);
      }
   };

   const handleAuthFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (authType === "login") {
         await handleLogin();
      } else {
         await handleSignUp();
      }

      closeModal();
   };

   const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEmailInput(e.target.value);
   };

   const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordInput(e.target.value);
   };

   const handleConfirmPasswordInputChange = (
      e: ChangeEvent<HTMLInputElement>
   ) => {
      setConfirmPasswordInput(e.target.value);
   };

   return (
      <form className={styles.container} onSubmit={handleAuthFormSubmit}>
         <div className={styles.inputWrapper}>
            <label className={styles.inputLabel} htmlFor="email">
               Email
            </label>
            <input
               className={styles.authInput}
               type="email"
               inputMode="email"
               value={emailInput}
               onChange={handleEmailInputChange}
            />
         </div>
         <div className={styles.inputWrapper}>
            <label className={styles.inputLabel} htmlFor="password">
               Password
            </label>
            <input
               className={styles.authInput}
               type="password"
               value={passwordInput}
               onChange={handlePasswordInputChange}
            />
         </div>
         {authType === "signup" ? (
            <div className={styles.inputWrapper}>
               <label className={styles.inputLabel} htmlFor="confirmPassword">
                  Confirm Password
               </label>
               <input
                  className={styles.authInput}
                  type="password"
                  value={confirmPasswordInput}
                  onChange={handleConfirmPasswordInputChange}
               />
            </div>
         ) : null}
         <button className={styles.authBtn} type="submit" disabled={isLoading}>
            {isLoading
               ? "Checking..."
               : authType === "login"
               ? "Log In"
               : "Sign Up"}
         </button>
      </form>
   );
}
