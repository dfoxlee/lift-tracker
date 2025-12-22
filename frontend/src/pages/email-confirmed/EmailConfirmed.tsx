import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./EmailConfirmed.module.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { fetchConfirmEmail } from "../../services/auth.services";
import { useAuthStore } from "../../stores/auth.stores";

export default function EmailConfirmed() {
   // hooks
   const params = useParams();
   const navigate = useNavigate();

   // stores
   const setToken = useAuthStore((state) => state.setToken);

   // effects functions
   const confirmToken = async () => {
      const emailConfirmationToken = params.emailConfirmationToken;

      if (!emailConfirmationToken) return navigate("/");

      try {
         const response = await fetchConfirmEmail(emailConfirmationToken);

         setToken(response.token);

         navigate("/home");
      } catch (error) {
         console.error(error);

         toast.error("Email confirmation failed. Please try again.");
      }
   };

   // effects
   useEffect(() => {
      confirmToken();
   }, [params]);

   return (
      <div className={styles.container}>
         <h1>Email Confirmed</h1>
         <p>Welcome aboard! You should be redirected shortly.</p>
         <Link to="/">Home</Link>
      </div>
   );
}
