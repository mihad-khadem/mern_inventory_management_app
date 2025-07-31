import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes (requires authentication)
router.use(authenticate);

// Admin only routes (example of role-based)
router.get("/", authorize(["admin"]), getAllUsers);
router.get("/:id", authorize(["admin", "manager", "staff"]), getUserById);
router.patch("/:id", authorize(["admin", "manager"]), updateUser);
router.delete("/:id", authorize(["admin"]), deleteUser);

export default router;
