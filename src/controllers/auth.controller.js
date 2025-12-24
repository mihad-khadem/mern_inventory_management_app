import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import { logAudit } from "../utils/audit.helper.js";
import { createUser, loginUser } from "../services/auth/auth.service.js";
import {
  generatePasswordResetToken,
  resetPassword,
} from "../utils/password.js";
import sendMail from "../utils/sendMail.js";

// Register controller
export const createUserController = catchAsync(async (req, res) => {
  const { username, email, password, role, company } = req.body;
  const user = await createUser({ username, email, password, role, company });

  // Audit: User registration
  await logAudit({
    req,
    action: "USER_REGISTERED",
    module: "AUTH",
    resourceType: "User",
    resourceId: user._id,
    description: `New user registered: ${user.email}`,
    after: { email: user.email, role: user.role },
  });

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: "User registered successfully",
    data: user,
  });
});

// Login controller
export const loginUserController = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser({ email, password });

    // Set HTTP-only cookies
    res.cookie("accessToken", token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Audit: Login
    await logAudit({
      req,
      action: "LOGIN",
      module: "AUTH",
      resourceType: "User",
      resourceId: user._id,
      description: `User logged in`,
      after: { email: user.email, role: user.role },
      userOverride: user,
      companyOverride: user.companyId,
    });

    sendResponse(res, {
      status: httpStatus.OK,
      message: "Login successful",
      data: { user },
    });
  } catch (err) {
    // Audit: Failed login
    await logAudit({
      req,
      action: "FAILED_LOGIN",
      module: "AUTH",
      resourceType: "User",
      resourceId: null,
      description: `Failed login attempt for email: ${email}`,
    });
    throw err;
  }
});
// Logout controller
export const logoutUserController = catchAsync(async (req, res) => {
  const { user } = req; // Assuming user is attached by auth middleware

  // Clear refresh token from user
  if (user) {
    user.refreshToken = undefined;
    await user.save({ validateBeforeSave: false });

    // Audit: Logout
    await logAudit({
      req,
      user,
      action: "LOGOUT",
      module: "AUTH",
      resourceType: "User",
      resourceId: user._id,
      description: `User logged out: ${user.email}`,
      userOverride: user,
      companyOverride: user.companyId,
    });
  }

  // Clear cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  sendResponse(res, {
    status: httpStatus.OK,
    message: "Logged out successfully",
  });
});
// todo: audit logging not writing actions to db

// Request password reset
export const requestPasswordResetController = catchAsync(async (req, res) => {
  const { email } = req.body;
  const resetToken = await generatePasswordResetToken(email);

  // Send reset token via email
  const subject = "Password Reset Request";
  const body = `Your password reset token is: ${resetToken}. This token will expire in 15 minutes.`;
  await sendMail(email, subject, body);

  // Audit: Password reset requested
  await logAudit({
    req,
    action: "PASSWORD_RESET_REQUESTED",
    module: "AUTH",
    resourceType: "User",
    resourceId: null, // Since we don't have user ID here
    description: `Password reset requested for email: ${email}`,
  });

  sendResponse(res, {
    status: httpStatus.OK,
    message: "Password reset email sent successfully",
  });
});

// Reset password
export const resetPasswordController = catchAsync(async (req, res) => {
  const { token, newPassword } = req.body;
  const { user } = await resetPassword(token, newPassword);

  // Audit: Password reset
  await logAudit({
    req,
    action: "PASSWORD_RESET",
    module: "AUTH",
    resourceType: "User",
    resourceId: user._id, // Assuming user has _id
    description: `Password reset for user: ${user.email}`,
    after: { email: user.email },
  });

  sendResponse(res, {
    status: httpStatus.OK,
    message: "Password reset successfully",
    data: { user },
  });
});
