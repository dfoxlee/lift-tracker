import express from "express";
import { getCompletedExercisesHistory } from "../controllers/completed-exercises.controller.js";

const completedExerciseRouter = express.Router();

completedExerciseRouter.get("/history", getCompletedExercisesHistory);

export default completedExerciseRouter;
