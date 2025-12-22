import { Route, Routes } from "react-router-dom";
import Layout from "./pages/shared/Layout";
import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import WorkoutComposition from "./pages/workout-composition/WorkoutComposition";
import CompletedWorkoutComposition from "./pages/completed-workout-composition/CompletedWorkoutComposition";
import SignUpComplete from "./pages/sign-up-complete/SignUpComplete";
import EmailConfirmed from "./pages/email-confirmed/EmailConfirmed";
import ChangeEmailComplete from "./pages/change-email-complete/ChangeEmailComplete";
import AccountDeleted from "./pages/account-deleted/AccountDeleted";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Landing />} />
         <Route path="/sign-up-complete" element={<SignUpComplete />} />
         <Route
            path="/change-email-complete"
            element={<ChangeEmailComplete />}
         />
         <Route
            path="/email-confirmed/:emailConfirmationToken"
            element={<EmailConfirmed />}
         />
         <Route path="/account-deleted" element={<AccountDeleted />} />
         <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
               path="workout/composition/:workoutId?"
               element={<WorkoutComposition />}
            />
            <Route
               path="completed-workout/composition/:workoutId/:completedWorkoutId?"
               element={<CompletedWorkoutComposition />}
            />
         </Route>
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
}

export default App;
