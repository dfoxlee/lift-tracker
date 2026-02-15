import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import usersRouter from "./routes/users.routes.js";
import workoutsRouter from "./routes/workouts.routes.js";
import completedWorkoutsRouter from "./routes/completed-workouts.routes.js";
import completedExerciseRouter from "./routes/completed-exercises.routes.js";

import { errorMiddleware } from "./middleware/error-middleware.js";
import { authMiddleware } from "./middleware/auth-middleware.js";
import { loggingMiddleware } from "./middleware/logging-middleware.js";
import logger from "./middleware/logging-middleware.js";
import { apiLimiter } from "./middleware/rate-limit-middleware.js";

dotenv.config();

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(apiLimiter);
app.use(loggingMiddleware);

// test routes
app.get("/api/v1/test", loggingMiddleware, (req, res) =>
   res.status(200).json("API is working properly"),
);
app.get("/api/v1/error", loggingMiddleware, (req, res, next) => {
   try {
      throw new Error("Test error handling middleware");
   } catch (error) {
      next(error);
   }
});

// routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/workouts", authMiddleware, workoutsRouter);
app.use("/api/v1/completed-workouts", authMiddleware, completedWorkoutsRouter);
app.use("/api/v1/completed-exercises", authMiddleware, completedExerciseRouter);

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from frontend dist folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route: serve index.html for all non-API routes (SPA routing)
app.get("/{*any}", (req, res) => {
   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// error middleware
app.use(errorMiddleware);

// server listening
const PORT = process.env.PORT || 4004;

app.listen(PORT, () =>
   logger.info(`Server running on port: http://localhost:${PORT}`),
);
