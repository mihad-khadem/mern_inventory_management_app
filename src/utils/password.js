import crypto from "crypto";
import httpStatus from "http-status";
import ApiError from "../error/apiError.js";
import UserModel from "../models/user/user.model.js";
import { hashPassword } from "../services/auth/auth.service.js";

// Hash token helper
export const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

// Generate password reset token by email
export const generatePasswordResetToken = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User with this email does not exist"
    );
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = hashToken(resetToken);

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 mins
  await user.save({ validateBeforeSave: false });

  return resetToken; // send this raw token via email / UI alert
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  const hashedToken = hashToken(token);

  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Invalid or expired password reset token"
    );
  }

  user.password = await hashPassword(newPassword);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = Date.now() - 1000; // optional
  await user.save();

  return {
    user: {
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
  };
};
