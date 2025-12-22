import {
   createNewWorkout,
   getUserWorkouts,
   getUserWorkoutById,
   updateWorkoutController,
   deleteWorkoutById,
} from "../controllers/workouts.controllers.js";
import express from "express";

const workoutsRouter = express.Router();

workoutsRouter.get("/", getUserWorkouts);
workoutsRouter.get("/:workoutId", getUserWorkoutById);
workoutsRouter.post("/", createNewWorkout);
workoutsRouter.patch("/", updateWorkoutController);
workoutsRouter.delete("/:workoutId", deleteWorkoutById);

export default workoutsRouter;
