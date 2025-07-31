import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../error/apiError.js";
import userModel from "../models/user.model.js";

const authenticate = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Authentication required");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or expired token");
  }
});

const authorize = (allowedRoles = []) =>
  catchAsync((req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(httpStatus.FORBIDDEN, "Access denied");
    }
    next();
  });

export { authenticate, authorize };
