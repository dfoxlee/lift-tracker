import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.stores";
import { useEffect } from "react";

export default function Layout() {
   // hooks
   const navigate = useNavigate();

   // stores
   const token = useAuthStore((state) => state.token);
   const setToken = useAuthStore((state) => state.setToken);

   // effects
   useEffect(() => {
      if (!token) {
         const localToken = localStorage.getItem("lift-tracker");

         if (!localToken) {
            navigate("/");
         }

         setToken(localToken);
      }
   }, [token, navigate]);

   return (
      <>
         <Outlet />
      </>
   );
}
