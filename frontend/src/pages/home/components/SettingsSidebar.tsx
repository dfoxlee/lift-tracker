import { FaTimes, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useState, type ChangeEvent, type FormEvent } from "react";
import StandardBtn from "../../shared/StandardBtn";
import { formatErrorMessage } from "../../../utils/formatting.utils";
import { toast } from "react-toastify";
import {
   fetchUpdatePassword,
   fetchUpdateUserEmail,
   fetchUpdateWeightUnitPreference,
} from "../../../services/account.services";
import { useAuthStore } from "../../../stores/auth.stores";
import StandardIconBtn from "../../shared/StandardIconBtn";
import {
   fetchDeleteAccount,
   fetchLogoutRequest,
} from "../../../services/auth.services";
import { useNavigate } from "react-router-dom";

import styles from "./SettingsSidebar.module.css";

export default function SettingsSidebar({ onClose }: { onClose: () => void }) {
   // states
   const [newPassword, setNewPassword] = useState("");
   const [confirmNewPassword, setConfirmNewPassword] = useState("");
   const [newEmail, setNewEmail] = useState("");
   const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] =
      useState(false);
   const [confirmEmail, setConfirmEmail] = useState("");

   // stores
   const token = useAuthStore((state) => state.token);
   const weightUnitPreferenceId = useAuthStore(
      (state) => state.weightUnitPreferenceId
   );
   const setWeightUnitPreferenceId = useAuthStore(
      (state) => state.setWeightUnitPreferenceId
   );

   // hooks
   const navigate = useNavigate();

   // handlers
   const handleChangePasswordSubmit = async (e: FormEvent) => {
      e.preventDefault();

      try {
         if (!token) return;
         if (newPassword !== confirmNewPassword) {
            toast.error("New password and confirm password do not match.");
            return;
         }

         await fetchUpdatePassword({ token, newPassword });

         toast.success("Password updated successfully.");

         setNewPassword("");
         setConfirmNewPassword("");
      } catch (error) {
         console.error(error);

         const message = formatErrorMessage(error);

         toast.error(message);
      }
   };

   const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      setNewPassword(e.target.value);
   };

   const handleConfirmNewPasswordChange = (
      e: ChangeEvent<HTMLInputElement>
   ) => {
      setConfirmNewPassword(e.target.value);
   };

   const handleDeleteAccountClick = () => {
      setShowDeleteAccountConfirmation(true);
   };

   const handleChangeEmailSubmit = async (e: FormEvent) => {
      e.preventDefault();

      try {
         await fetchUpdateUserEmail({
            token: token!,
            newEmail,
         });

         return navigate("/change-email-complete");
      } catch (error) {
         console.error(error);

         const message = formatErrorMessage(error);

         toast.error(message);
      }
   };

   const handleCloseClick = () => {
      onClose();
   };

   const handleLogoutClick = async () => {
      try {
         await fetchLogoutRequest(token!);

         localStorage.removeItem("lift-tracker");

         return navigate("/");
      } catch (error) {
         console.error(error);

         const message = formatErrorMessage(error);

         toast.error(message);
      }
   };

   const handleUpdateWeightUnitPreference = async () => {
      try {
         if (!token) return;

         const id = !weightUnitPreferenceId
            ? 2
            : weightUnitPreferenceId === 1
            ? 2
            : 1;

         await fetchUpdateWeightUnitPreference({
            token,
            weightUnitPreferenceId: id,
         });

         setWeightUnitPreferenceId(id);

         toast.success("Weight unit preference updated successfully.");
      } catch (error) {
         console.error(error);

         const message = formatErrorMessage(error);

         toast.error(message);
      }
   };

   const handleNewEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
      setNewEmail(e.target.value);
   };

   const handleConfirmDeleteAccountSubmit = async (e: FormEvent) => {
      e.preventDefault();

      try {
         await fetchDeleteAccount({ token: token!, email: confirmEmail });

         return navigate("/account-deleted");
      } catch (error) {
         console.error(error);

         const message = formatErrorMessage(error);

         toast.error(message);
      }
   };

   const handleCancelDeleteClick = () => {
      setShowDeleteAccountConfirmation(false);
   };

   const handleConfirmEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
      setConfirmEmail(e.target.value);
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.headerWrapper}>
               <StandardIconBtn Icon={FaTimes} onClick={handleCloseClick} />
               <StandardBtn text="Logout" onClick={handleLogoutClick} />
            </div>
            <h2 className={styles.title}>Settings</h2>
            <button
               className={styles.unitPreferenceBtn}
               onClick={handleUpdateWeightUnitPreference}
            >
               <span className={styles.unitPreferenceText}>lb</span>
               {!weightUnitPreferenceId || weightUnitPreferenceId === 1 ? (
                  <FaToggleOff className={styles.unitPreferenceIcon} />
               ) : (
                  <FaToggleOn className={styles.unitPreferenceIcon} />
               )}
               <span className={styles.unitPreferenceText}>kg</span>
            </button>
            <div className={styles.changeAccountInfoWrapper}>
               <div className={styles.changePasswordWrapper}>
                  <h3 className={styles.changePasswordTitle}>
                     Change Password
                  </h3>
                  <form
                     className={styles.formWrapper}
                     onSubmit={handleChangePasswordSubmit}
                  >
                     <div className={styles.inputWrapper}>
                        <label
                           className={styles.inputLabel}
                           htmlFor="new-password"
                        >
                           new password
                        </label>
                        <input
                           className={styles.changePasswordInput}
                           placeholder="Enter new password"
                           type="password"
                           id="new-password"
                           value={newPassword}
                           onChange={handleNewPasswordChange}
                        />
                     </div>
                     <div className={styles.inputWrapper}>
                        <label
                           className={styles.inputLabel}
                           htmlFor="confirm-new-password"
                        >
                           confirm new password
                        </label>
                        <input
                           className={styles.changePasswordInput}
                           placeholder="Enter confirm new password"
                           type="password"
                           id="confirm-new-password"
                           value={confirmNewPassword}
                           onChange={handleConfirmNewPasswordChange}
                        />
                     </div>
                     <button type="submit" className={styles.updatePasswordBtn}>
                        Update Password
                     </button>
                  </form>
               </div>
               <div className={styles.changeEmailWrapper}>
                  <h3 className={styles.changeEmailTitle}>Change Email</h3>
                  <form
                     className={styles.formWrapper}
                     onSubmit={handleChangeEmailSubmit}
                  >
                     <div>
                        <label
                           className={styles.inputLabel}
                           htmlFor="new-email"
                        >
                           new email
                        </label>
                        <input
                           className={styles.changeEmailInput}
                           placeholder="Enter new email"
                           type="email"
                           id="new-email"
                           value={newEmail}
                           onChange={handleNewEmailChange}
                        />
                     </div>
                     <button type="submit" className={styles.updateEmailBtn}>
                        Update Email
                     </button>
                  </form>
               </div>
            </div>

            <div className={styles.deleteAccountWrapper}>
               <div className={styles.deleteAccountTextWrapper}>
                  <h3>Delete Account</h3>
                  <p>
                     Warning: This action is irreversible. Please proceed with
                     caution.
                  </p>
               </div>
               {showDeleteAccountConfirmation ? (
                  <form
                     className={styles.formWrapper}
                     onSubmit={handleConfirmDeleteAccountSubmit}
                  >
                     <div>
                        <label
                           className={styles.inputLabel}
                           htmlFor="confirm-delete"
                        >
                           one last confirmation
                        </label>
                        <input
                           className={styles.confirmDeleteInput}
                           type="text"
                           placeholder="Type your email to confirm..."
                           value={confirmEmail}
                           onChange={handleConfirmEmailChange}
                        />
                     </div>
                     <div className={styles.btnsWrapper}>
                        <StandardBtn
                           text="Just Kidding"
                           onClick={handleCancelDeleteClick}
                           filled={false}
                        />
                        <button
                           className={styles.confirmDeleteBtn}
                           type="submit"
                        >
                           Do It
                        </button>
                     </div>
                  </form>
               ) : (
                  <StandardBtn
                     text="Delete Account"
                     onClick={handleDeleteAccountClick}
                     styleType="danger"
                  />
               )}
            </div>
         </div>
      </div>
   );
}
