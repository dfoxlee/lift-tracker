import nodemailer from "nodemailer";
import logger from "../middleware/logging-middleware.js";
import { debugLogger } from "./debug-logger.utils.js";

// Create transporter function to ensure env vars are loaded
const createTransporter = () => {
   return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD,
      },
   });
};

export const emailConfirmationToUser = async ({ confirmationToken, email }) => {
   const confirmationUrl = `${process.env.FRONTEND_URL}/email-confirmed/${confirmationToken}`;

   const mailOptions = {
      from: `"Lift Tracker" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirm Your Email - Lift Tracker",
      html: `
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="text-align: center;">Welcome to Lift Tracker!</h2>
            <p style="text-align: center;">Thanks for signing up. Please confirm your email address by clicking the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
               <a href="${confirmationUrl}" 
                  style="background-color: #ff8400; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                  Confirm Email
               </a>
            </div>
            <p style="color: #999; font-size: 12px; margin-top: 40px; text-align: center;">
               If you didn't create an account, you can safely ignore this email.
            </p>
         </div>
      `,
      text: `Welcome to Lift Tracker! Please confirm your email by visiting: ${confirmationUrl}`,
   };

   try {
      const transporter = createTransporter();
      const info = await transporter.sendMail(mailOptions);

      logger.info("Confirmation email sent", {
         email,
         messageId: info.messageId,
      });

      return info;
   } catch (error) {
      console.error("Error sending email:", error);

      throw new Error("Failed to send confirmation email");
   }
};
