import express from "express";
import {
   getNewCompletedWorkout,
   getCompletedWorkout,
   getUserWorkouts,
   createCompletedWorkoutController,
   updateCompletedWorkoutController,
   deleteCompletedWorkoutController,
} from "../controllers/completed-workouts.controllers.js";

const completedWorkoutsRouter = express.Router();

completedWorkoutsRouter.get("/new/:workoutId", getNewCompletedWorkout);
completedWorkoutsRouter.get("/:completedWorkoutId", getCompletedWorkout);
completedWorkoutsRouter.delete(
   "/:completedWorkoutId",
   deleteCompletedWorkoutController
);
completedWorkoutsRouter.get("/", getUserWorkouts);
completedWorkoutsRouter.post("/", createCompletedWorkoutController);
completedWorkoutsRouter.patch(
   "/",
   updateCompletedWorkoutController
);

export default completedWorkoutsRouter;
