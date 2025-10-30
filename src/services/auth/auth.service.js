import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import ApiError from "../../error/apiError.js";
import config from "../../config/index.js";
import UserModel from "../../models/user/user.model.js";
import { generateCustomId } from "../../utils/customIdGenaration.js";
// services/auth/auth.service.js
// Hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare password
export const comparePassword = async (plain, hashed) =>
  bcrypt.compare(plain, hashed);

// Generate tokens
export const generateAccessToken = (payload) =>
  jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });

export const generateRefreshToken = (payload) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

// Create user
export const createUser = async ({
  username,
  email,
  password,
  role,
  company,
}) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) throw new Error("Email already in use");

  const hashed = await hashPassword(password);

  // Default role & company if not provided
  const assignedRole = role || "user";
  const assignedCompany = company || "";

  // Generate custom userId if role/company exists
  let userId = null;
  if (role || company) {
    const rolePrefix = assignedRole.substring(0, 3).toUpperCase(); // e.g., "STA"
    const companyPrefix = assignedCompany ? assignedCompany.toUpperCase() : "";
    userId = await generateCustomId({
      modelName: "User",
      rolePrefix,
      companyPrefix,
    });
  }

  const user = await UserModel.create({
    username,
    email,
    password: hashed,
    role: assignedRole,
    company: assignedCompany || null,
    userId,
  });

  return user;
};

// Validate credentials
export const validateUserCredentials = async (email, password) => {
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");

  const isValid = await comparePassword(password, user.password);
  if (!isValid)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");

  return user;
};

// Login user
export const loginUser = async ({ email, password }) => {
  const user = await validateUserCredentials(email, password);
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  const token = generateAccessToken({ id: user._id, role: user.role });
  if (!token)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Token generation failed");
  return { user, token };
};
