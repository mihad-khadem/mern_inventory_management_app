import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../error/apiError.js";
import User from "../models/user.model.js";

export const authenticate = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Authentication required");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or expired token");
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
