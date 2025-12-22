import pool from "../db/db-config.js";
import { debugLogger } from "../utils/debug-logger.utils.js";

export const findUserByEmail = async ({ email }) => {
   const query = `
      select user_id as userId,
         email,
         email_confirmation_token as emailConfirmationToken,
         confirmed_date as confirmedDate,
         hashed_password as hashedPassword,
         token,
         weight_unit_preference_id as weightUnitPreferenceId,
         created_date as createdDate
      from user
      where email = ?
   `;

   const values = [email];

   const [results] = await pool.execute(query, values);

   return results;
};

export const findUserByConfirmationToken = async ({
   emailConfirmationToken,
}) => {
   const query = `
      select user_id as userId,
         email,
         email_confirmation_token as emailConfirmationToken,
         hashed_password as hashedPassword,
         token,
         confirmed_date as confirmedDate,
         weight_unit_preference_id as weightUnitPreferenceId,
         created_date as createdDate
      from user
      where email_confirmation_token = ?
   `;

   const values = [emailConfirmationToken];

   const [results] = await pool.execute(query, values);

   return results;
};

export const createUser = async ({
   email,
   hashedPassword,
   createdDate,
   emailConfirmationToken,
}) => {
   const query = `
      insert into user (email, hashed_password, created_date, email_confirmation_token)
      values (?, ?, ?, ?)
   `;

   const values = [email, hashedPassword, createdDate, emailConfirmationToken];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Failed to create user.");
   }

   return results;
};

export const updateUserToken = async ({ userId, token }) => {
   debugLogger(userId, token);
   const query = `
      update user
      set token = ?
      where user_id = ?
   `;

   const values = [token, userId];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Failed to update user token.");
   }

   return results;
};

export const confirmUserEmail = async ({
   emailConfirmationToken,
   confirmedDate,
}) => {
   const query = `
      update user
      set confirmed_date = ?
      where email_confirmation_token = ?
   `;

   const values = [confirmedDate, emailConfirmationToken];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Failed to confirm user email.");
   }

   return results;
};

export const updateWeightUnitPreference = async ({
   userId,
   weightUnitPreferenceId,
}) => {
   const query = `
      update user
      set weight_unit_preference_id = ?
      where user_id = ?
   `;

   const values = [weightUnitPreferenceId, userId];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Failed to update weight unit preference.");
   }

   return results;
};

export const updateUserPassword = async ({ userId, hashedPassword }) => {
   const query = `
      update user
      set hashed_password = ?
      where user_id = ?
   `;

   const values = [hashedPassword, userId];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Failed to update user password.");
   }

   return results;
};

export const deleteUser = async ({ userId, email }) => {
   const query = `
      delete from user
      where user_id = ?
      and email = ?;
   `;

   const values = [userId, email];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Failed to delete user.");
   }

   return results;
};

export const updateConfirmationToken = async ({
   userId,
   emailConfirmationToken,
}) => {
   const query = `
      update user
      set email_confirmation_token = ?
      where user_id = ?
   `;

   const values = [emailConfirmationToken, userId];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Failed to update confirmation token.");
   }

   return results;
};

export const updateUserEmail = async ({
   userId,
   emailConfirmationToken,
   newEmail,
}) => {
   const query = `
      update user
      set email = ?,
         email_confirmation_token = ?,
         confirmed_date = NULL
      where user_id = ?
   `;

   const values = [newEmail, emailConfirmationToken, userId];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Failed to update user email.");
   }

   return results;
};

export const logoutUser = async ({ userId }) => {
   const query = `
      update user
      set token = NULL
      where user_id = ?
   `;

   const values = [userId];

   const [results] = await pool.execute(query, values);

   if (!results.affectedRows) {
      throw new Error("Failed to logout user.");
   }

   return results;
};
