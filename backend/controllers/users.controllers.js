import {
   findUserByEmail,
   findUserByConfirmationToken,
   createUser,
   confirmUserEmail,
   updateUserToken,
   updateUserPassword,
   updateWeightUnitPreference,
   updateUserEmail,
   deleteUser,
   logoutUser,
} from "../services/users.services.js";
import {
   comparePassword,
   generateToken,
   hashPassword,
} from "../utils/auth.utils.js ";
import { formatDateForDb } from "../utils/formatting.utils.js";
import { debugLogger } from "../utils/debug-logger.utils.js";
import { emailConfirmationToUser } from "../utils/email.utils.js";

export const signUpUser = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      const user = await findUserByEmail({ email });

      if (user.length) {
         return res.status(409).json({ message: "Email already in use." });
      }

      const hashedPassword = await hashPassword(password);

      const createdDate = formatDateForDb(new Date());

      const emailConfirmationToken = generateToken({ email });

      await createUser({
         email,
         hashedPassword,
         createdDate,
         emailConfirmationToken,
      });

      // Send confirmation email
      await emailConfirmationToUser({
         confirmationToken: emailConfirmationToken,
         email,
      });

      res.status(201).json("User created successfully.");
   } catch (error) {
      next(error);
   }
};

export const loginUser = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      const user = await findUserByEmail({ email });

      if (!user.length) {
         return res.status(401).json({ message: "Invalid email or password." });
      }

      if (!user[0].confirmedDate) {
         throw new Error("Email not confirmed.");
      }

      const isPasswordValid = await comparePassword(
         password,
         user[0].hashedPassword
      );

      if (!isPasswordValid) {
         return res.status(401).json({ message: "Invalid email or password." });
      }

      const token = generateToken({ userId: user[0].userId });

      await updateUserToken({ userId: user[0].userId, token });

      res.status(200).json({ token });
   } catch (error) {
      next(error);
   }
};

export const confirmEmail = async (req, res, next) => {
   try {
      const { emailConfirmationToken } = req.params;

      const user = await findUserByConfirmationToken({
         emailConfirmationToken,
      });

      if (!user.length) {
         throw new Error("Invalid confirmation token.");
      }

      if (user[0].is_email_confirmed) {
         throw new Error("Email already confirmed.");
      }

      const confirmedDate = formatDateForDb(new Date());

      await confirmUserEmail({ emailConfirmationToken, confirmedDate });

      const token = generateToken({ userId: user[0].userId });

      await updateUserToken({ userId: user[0].userId, token });

      res.status(200).json({ token });
   } catch (error) {
      next(error);
   }
};

export const updateWeightUnitPreferenceController = async (req, res, next) => {
   try {
      const { userId } = req;

      const { weightUnitPreferenceId } = req.body;

      await updateWeightUnitPreference({ userId, weightUnitPreferenceId });

      res.status(200).json("Weight unit preference updated successfully.");
   } catch (error) {
      next(error);
   }
};

export const updatePassword = async (req, res, next) => {
   try {
      const { userId } = req;

      const { newPassword } = req.body;

      const hashedPassword = await hashPassword(newPassword);

      await updateUserPassword({ userId, hashedPassword });

      res.status(200).json("Password updated successfully.");
   } catch (error) {
      next(error);
   }
};

export const updateUserEmailController = async (req, res, next) => {
   try {
      const { userId } = req;

      const { newEmail } = req.body;

      const emailConfirmationToken = generateToken({ newEmail });

      await updateUserEmail({ userId, emailConfirmationToken, newEmail });

      res.status(200).json("Email updated successfully.");
   } catch (error) {
      next(error);
   }
};

export const confirmEmailController = async (req, res, next) => {
   try {
      const { emailConfirmationToken } = req.params;

      const user = await findUserByConfirmationToken({
         emailConfirmationToken,
      });

      if (!user.length) {
         return res
            .status(400)
            .json({ message: "Invalid confirmation token." });
      }

      if (user[0].is_email_confirmed) {
         return res.status(400).json({ message: "Email already confirmed." });
      }

      const confirmedDate = formatDateForDb(new Date());

      await confirmUserEmail({ emailConfirmationToken, confirmedDate });

      res.status(200).json("Email confirmed successfully.");
   } catch (error) {
      next(error);
   }
};

export const deleteUserController = async (req, res, next) => {
   try {
      const { userId } = req;
      const { email } = req.body;

      await deleteUser({ userId, email });

      res.status(200).json("User deleted successfully.");
   } catch (error) {
      next(error);
   }
};

export const logoutUserController = async (req, res, next) => {
   try {
      const { userId } = req;

      await logoutUser({ userId });

      res.status(200).json("User logged out successfully.");
   } catch (error) {
      next(error);
   }
};
