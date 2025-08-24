import httpStatus from "http-status";
import userModel from "../models/user/user.model.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";
import ApiError from "../error/apiError.js";
// user controller
// GET /api/users - Get all users
const getAllUsers = catchAsync(async (req, res) => {
  const users = await userModel.find().select("-password");
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: "Users fetched successfully",
    data: users,
  });
});

// GET /api/users/:id - Get user by ID
const getUserById = catchAsync(async (req, res) => {
  const user = await userModel.findById(req.params.id).select("-password");
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  sendResponse(res, {
    status: httpStatus.OK,
    message: "User fetched successfully",
    data: user,
  });
});

// PATCH /api/users/:id - Update user
const updateUser = catchAsync(async (req, res) => {
  const updates = req.body;
  const user = await userModel.findById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Not authorized to update this user"
    );
  }

  Object.assign(user, updates);
  await user.save();

  sendResponse(res, {
    status: httpStatus.OK,
    message: "User updated successfully",
  });
});

// DELETE /api/users/:id - Delete user
const deleteUser = catchAsync(async (req, res) => {
  const user = await userModel.findByIdAndDelete(req.params.id);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Not authorized to delete this user"
    );
  }
  sendResponse(res, {
    status: httpStatus.OK,
    message: "User deleted successfully",
  });
});

export { getAllUsers, getUserById, updateUser, deleteUser };
