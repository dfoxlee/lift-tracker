import express from "express";

import {
   loginUser,
   signUpUser,
   confirmEmail,
   updatePassword,
   updateWeightUnitPreferenceController,
   updateUserEmailController,
   logoutUserController,
   deleteUserController,
} from "../controllers/users.controllers.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { authLimiter } from "../middleware/rate-limit-middleware.js";

const usersRouter = express.Router();

usersRouter.post("/sign-up", signUpUser);
usersRouter.post("/login", authLimiter, loginUser);
usersRouter.get("/confirm-email/:emailConfirmationToken", confirmEmail);
usersRouter.post("/logout", authMiddleware, logoutUserController);
usersRouter.post("/update-password", authMiddleware, updatePassword);
usersRouter.post(
   "/update-weight-unit-preference",
   authMiddleware,
   updateWeightUnitPreferenceController
);
usersRouter.post("/update-email", authMiddleware, updateUserEmailController);
usersRouter.delete("/delete-account", authMiddleware, deleteUserController);

export default usersRouter;
