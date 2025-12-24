import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import ApiError from "../../error/apiError.js";
import config from "../../config/index.js";
import UserModel from "../../models/user/user.model.js";
import { generateCustomId } from "../../utils/customIdGenaration.js";
import { validateUserCredentials } from "../../validations/auth.validation.js";

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
  jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: "30d" });

// Create user
export const createUser = async ({
  username,
  email,
  password,
  role,
  company,
}) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser)
    throw new ApiError(httpStatus.CONFLICT, "Email already in use");

  const hashed = await hashPassword(password);
  const assignedRole = role || "user";
  const assignedCompany = company || "";

  let userId = null;
  if (role || company) {
    const rolePrefix = assignedRole.substring(0, 3).toUpperCase();
    const companyPrefix = assignedCompany ? assignedCompany.toUpperCase() : "";
    userId = await generateCustomId({
      modelName: "User",
      rolePrefix,
      companyPrefix,
    });
  }

  const user = await UserModel.create({
    userId,
    username,
    email,
    password: hashed,
    role: assignedRole,
    company: assignedCompany || null,
  });

  return user;
};

// Validate credentials with lockout
// export const validateUserCredentials = async (user) => {
//   const user = await UserModel.findOne({ email }).select(
//     "+password +loginAttempts +lockUntil +isBlocked +status"
//   );
//   if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");

//   // Check if account is blocked or inactive
//   if (user.isBlocked || user.status !== "active") {
//     throw new ApiError(httpStatus.FORBIDDEN, "Account is not active");
//   }

//   // Check lockout
//   if (user.isLocked) {
//     throw new ApiError(
//       httpStatus.FORBIDDEN,
//       `Account locked. Try again at ${user.lockUntil.toLocaleTimeString()}`
//     );
//   }

//   const isValid = await comparePassword(password, user.password);

//   if (!isValid) {
//     user.loginAttempts += 1;

//     // Lock account if max attempts exceeded
//     if (user.loginAttempts >= config.maxLoginAttempts) {
//       user.lockUntil = Date.now() + config.lockTime;
//       user.loginAttempts = 0; // reset attempts after locking
//     }

//     await user.save({ validateBeforeSave: false });
//     throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
//   }

//   // Reset login attempts on successful login
//   if (user.loginAttempts > 0 || user.lockUntil) {
//     user.loginAttempts = 0;
//     user.lockUntil = undefined;
//     await user.save({ validateBeforeSave: false });
//   }

//   return user;
// };

// Login user with lockout & verification checks
// export const loginUser = async ({ email, password }) => {
//   const user = await UserModel.findOne({ email }).select(
//     "+password +loginAttempts +lockUntil +isBlocked"
//   );

//   if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");

//   // Check if account is locked
//   if (user.isLocked) {
//     const remaining = Math.ceil((user.lockUntil - Date.now()) / 60000); // minutes
//     throw new ApiError(
//       httpStatus.FORBIDDEN,
//       `Account is locked. Try again in ${remaining} minute(s).`
//     );
//   }

//   // Check if blocked
//   if (user.isBlocked) {
//     throw new ApiError(
//       httpStatus.FORBIDDEN,
//       "Your account is blocked. Contact admin."
//     );
//   }

//   // Check credentials
//   const isValid = await comparePassword(password, user.password);

//   if (!isValid) {
//     // Increment login attempts
//     user.loginAttempts += 1;

//     // Lock account after 5 failed attempts
//     if (user.loginAttempts >= 5) {
//       user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 min lock
//       user.loginAttempts = 0; // reset attempts
//     }

//     await user.save();
//     throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
//   }

//   // Reset login attempts on successful login
//   user.loginAttempts = 0;
//   user.lockUntil = undefined;

//   // Generate tokens
//   const accessToken = generateAccessToken({ id: user._id, role: user.role });
//   const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
//   user.refreshToken = refreshToken;
//   await user.save();

//   return {
//     user: {
//       userId: user.userId,
//       username: user.username,
//       email: user.email,
//       role: user.role,
//       company: user.company,
//       status: user.status,
//       isVerified: user.isVerified,
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt,
//     },
//     token: { accessToken, refreshToken },
//   };
// };
export const loginUser = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Email and password are required"
    );
  }
  const user = await validateUserCredentials(email, password);

  // Generate tokens
  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: {
      _id: user._id,
      userId: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
      company: user.company,
      status: user.status,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token: { accessToken, refreshToken },
  };
};
