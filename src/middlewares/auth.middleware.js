// import jwt from "jsonwebtoken";
// import httpStatus from "http-status";
// import catchAsync from "../utils/catchAsync.js";
// import ApiError from "../error/apiError.js";
// import User from "../models/user.model.js";

// export const authenticate = catchAsync(async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith("Bearer ")) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, "Authentication required");
//   }

//   const token = authHeader.split(" ")[1];
//   console.log(token);

//   if (!token) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, "Authentication required");
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     const user = await User.findById(decoded.userId);
//     if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error(err);
//     throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or expired token");
//   }
// });

// Authorize based on role
export const authorize = (allowedRoles = []) =>
  catchAsync((req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(httpStatus.FORBIDDEN, "Access denied");
    }
    next();
  });
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import ApiError from "../error/apiError.js";
import User from "../models/user.model.js";
import config from "../config/index.js";

export const authenticate = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error("Authorization header missing");
    throw new ApiError(httpStatus.UNAUTHORIZED, "Authentication required");
  }

  if (!authHeader.startsWith("Bearer ")) {
    console.error("Authorization header malformed");
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token format");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.error("Token missing after Bearer");
    throw new ApiError(httpStatus.UNAUTHORIZED, "Authentication required");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Fetch user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.error("User not found for decoded token");
      throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.error("Token expired");
      throw new ApiError(httpStatus.UNAUTHORIZED, "Token expired");
    } else if (err.name === "JsonWebTokenError") {
      console.error("JWT malformed:", err.message);
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
    } else {
      console.error("Token verification error:", err);
      throw new ApiError(httpStatus.UNAUTHORIZED, "Authentication failed");
    }
  }
});
