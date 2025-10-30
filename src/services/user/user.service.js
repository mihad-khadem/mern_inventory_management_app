import User from "../../models/user/user.model.js";
import { hashPassword, comparePassword } from "../auth/auth.service.js";
// User service
/**
 * Create a new user
 * Throws error if email already exists
 */

/**
 * Find user by ID
 * Returns user or null
 */
const getUserById = async (id) => {
  return User.findById(id).select("-password");
};

/**
 * Find all users with optional filters (pagination, etc)
 */
const getAllUsers = async (filter = {}, options = {}) => {
  // options can include pagination, sorting, fields etc
  return User.find(filter)
    .select("-password")
    .limit(options.limit || 10)
    .skip(options.skip || 0)
    .sort(options.sort || { createdAt: -1 });
};

/**
 * Update user by ID
 * If password is updated, hash it before saving
 */
const updateUser = async (id, updateData) => {
  if (updateData.password) {
    updateData.password = await hashPassword(updateData.password);
  }

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

/**
 * Delete user by ID
 * Returns deleted user or throws error if not found
 */
const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id).select("-password");
  if (!deletedUser) {
    throw new Error("User not found");
  }
  return deletedUser;
};

export default {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
