import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRES_IN = "1h";

export const hashPassword = async (password) => {
   const salt = await bcrypt.genSalt(SALT_ROUNDS);

   return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
   return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload) => {
   // return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
   return jwt.sign(payload, JWT_SECRET);
};

export const verifyToken = (token) => {
   return jwt.verify(token, JWT_SECRET);
};
