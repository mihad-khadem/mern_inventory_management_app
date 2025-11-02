import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import { createUser, loginUser } from "../services/auth/auth.service.js";
import {
  generatePasswordResetToken,
  resetPassword,
} from "../utils/password.js";

// Register controller
export const createUserController = catchAsync(async (req, res) => {
  const { username, email, password, role, company } = req.body;
  const user = await createUser({ username, email, password, role, company });

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: "User registered successfully",
    data: user,
  });
});

// Login controller
export const loginUserController = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser({ email, password });

  sendResponse(res, {
    status: httpStatus.OK,
    message: "Login successful",
    data: { user, token },
  });
});

// Request password reset
export const requestPasswordResetController = catchAsync(async (req, res) => {
  const { email } = req.body;
  const resetToken = await generatePasswordResetToken(email);

  // You can send resetToken via email, or return to UI for demo
  sendResponse(res, {
    status: httpStatus.OK,
    message: "Password reset token generated",
    data: { resetToken },
  });
});

// Reset password
export const resetPasswordController = catchAsync(async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await resetPassword(token, newPassword);

  sendResponse(res, {
    status: httpStatus.OK,
    message: "Password reset successfully",
    data: { user },
  });
});
