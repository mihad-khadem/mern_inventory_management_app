import User from "../models/user/user.model.js";
import ApiError from "../error/apiError.js";
import config from "../config/index.js";
import { comparePassword } from "../services/auth/auth.service.js";

// Validate user credentials
export const validateUserCredentials = async (email, password) => {
  const user = await User.findOne({ email }).select(
    "+password +loginAttempts +lockUntil +isBlocked"
  );

  if (!user) throw new ApiError(401, "Invalid credentials");

  if (user.isBlocked) throw new ApiError(403, "Account is blocked");

  if (user.lockUntil && user.lockUntil > Date.now()) {
    const minutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
    throw new ApiError(
      403,
      `Account locked. Try again in ${minutesLeft} minute(s).`
    );
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    await handleFailedLogin(user);
    throw new ApiError(401, "Invalid credentials");
  }

  await resetLoginAttempts(user);
  return user;
};

// Helper functions
const handleFailedLogin = async (user) => {
  user.loginAttempts += 1;
  if (user.loginAttempts >= config.maxLoginAttempts) {
    user.lockUntil = Date.now() + config.lockTime;
    user.loginAttempts = 0;
  }
  await user.save({ validateBeforeSave: false });
};

const resetLoginAttempts = async (user) => {
  user.loginAttempts = 0;
  user.lockUntil = undefined;
  await user.save({ validateBeforeSave: false });
};

// cookie validation function
export const validateAuthCookies = async (accessToken, refreshToken) => {
  // Implement your token validation logic here
  // For example, decode and verify JWT tokens
  if (!accessToken || !refreshToken) {
    throw new ApiError(401, "Authentication cookies are missing");
  }
};
