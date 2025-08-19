import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {
  comparePassword,
  generateAccessToken,
} from "../services/auth.service.js";

// Register user
const registerUser = catchAsync(async (req, res) => {
  const { username, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return sendResponse(res, {
      status: httpStatus.CONFLICT,
      success: false,
      message: "User already exists with this email",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role || "staff",
  });

  user.password = undefined; // Exclude password from response

  sendResponse(res, {
    status: httpStatus.CREATED,
    message: "User registered successfully",
    data: user,
  });
});

// Login user
const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return sendResponse(res, {
      status: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Invalid email or password",
    });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return sendResponse(res, {
      status: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = generateAccessToken({ userId: user._id, role: user.role });
  user.password = undefined;

  sendResponse(res, {
    status: httpStatus.OK,
    message: "Login successful",
    data: { user, token },
  });
});

export { registerUser, loginUser };
