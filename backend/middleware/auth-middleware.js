import { verifyToken } from "../utils/auth.utils.js";

export const authMiddleware = (req, res, next) => {
   try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
         throw new Error("Unauthorized: No token provided");
      }

      const decoded =  verifyToken(token);

      req.userId = decoded.userId;

      next();
   } catch (error) {
      next(error);
   }
};
