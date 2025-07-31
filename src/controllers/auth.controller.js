import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Register user
const registerUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

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
    name,
    email,
    password: hashedPassword,
    role: role || "user",
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

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return sendResponse(res, {
      status: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  user.password = undefined;

  sendResponse(res, {
    status: httpStatus.OK,
    message: "Login successful",
    data: { user, token },
  });
});

export { registerUser, loginUser };
