import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/index.js";

// Hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare password
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate tokens
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: "7d",
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};
