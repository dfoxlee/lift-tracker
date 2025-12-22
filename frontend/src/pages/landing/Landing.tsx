import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

import styles from "./Landing.module.css";

export default function Landing() {
   return (
      <div>
         <Navbar />
         <Hero />
      </div>
   );
}
