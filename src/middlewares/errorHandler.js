// src/middlewares/errorHandler.js
import httpStatus from "http-status";
import ApiError from "../error/apiError.js";
import sendResponse from "../utils/sendResponse.js";

const errorHandler = (err, req, res, next) => {
  // If error is an instance of your custom ApiError
  if (err instanceof ApiError) {
    return sendResponse(res, {
      status: err.statusCode,
      success: false,
      message: err.message,
    });
  }

  // For mongoose validation errors
  if (err.name === "ValidationError") {
    return sendResponse(res, {
      status: httpStatus.BAD_REQUEST,
      success: false,
      message: err.message,
    });
  }

  // Duplicate key error (MongoDB)
  if (err.code && err.code === 11000) {
    return sendResponse(res, {
      status: httpStatus.CONFLICT,
      success: false,
      message: "Duplicate field value entered",
      data: err.keyValue,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return sendResponse(res, {
      status: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return sendResponse(res, {
      status: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Token expired",
    });
  }

  // Fallback to 500 Server Error
  console.error(err);

  sendResponse(res, {
    status: httpStatus.INTERNAL_SERVER_ERROR,
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
