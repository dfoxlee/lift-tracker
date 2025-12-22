import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Bounce, ToastContainer } from "react-toastify";

import "./index.css";

createRoot(document.getElementById("root")!).render(
   <BrowserRouter>
      <ToastContainer
         position="top-center"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick={false}
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="colored"
         transition={Bounce}
      />
      <App />
   </BrowserRouter>
);
