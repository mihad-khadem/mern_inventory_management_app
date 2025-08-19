import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ All routes below require authentication
router.use(authenticate);

// ✅ Admin only can see all users
router.get("/", authorize(["admin"]), getAllUsers);

// ✅ Admin, manager, staff can see user by ID
router.get("/:id", authorize(["admin", "manager", "staff"]), getUserById);

// ✅ Update user: allow admins to update anyone,
// and normal users can only update themselves
router.patch("/:id", updateUser);

// ✅ Delete user: admin only
router.delete("/:id", authorize(["admin"]), deleteUser);

export default router;
