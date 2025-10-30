// auth.controller.js
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import { createUser, loginUser } from "../services/auth/auth.service.js";
// Register controller
export const createUserController = catchAsync(async (req, res) => {
  const { username, email, password, role } = req.body;
  const user = await createUser({ username, email, password, role });

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
