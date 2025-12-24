import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../error/apiError.js";
import config from "../config/index.js";
import UserModel from "../models/user/user.model.js";

export const authenticate = catchAsync(async (req, res, next) => {
  let token = null;

  // ✅ 1. Try to get token from cookies first
  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }
  // ✅ 2. Fallback to Authorization header (for non-browser clients)
  else if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // ❌ No token found
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Authentication required");
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // ✅ Find user from decoded payload
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
    }

    // ✅ Attach user to request
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Token expired");
    } else if (err.name === "JsonWebTokenError") {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Authentication failed");
    }
  }
});
// Authorize based on role
export const authorize = (allowedRoles = []) =>
  catchAsync((req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(httpStatus.FORBIDDEN, "Access denied");
    }
    next();
  });
// Authorize based on permissions
export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Authentication required");
    }

    const allowed = ROLE_PERMISSIONS[req.user.role] || [];
    if (!allowed.includes(permission)) {
      throw new ApiError(httpStatus.FORBIDDEN, "Permission denied");
    }

    next();
  };
};
