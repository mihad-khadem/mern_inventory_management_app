import express from "express";
import {
  createUserController,
  loginUserController,
  requestPasswordResetController,
  resetPasswordController,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Public auth routes
router.post("/register", createUserController);
router.post("/login", loginUserController);
router.post("/password-reset/request", requestPasswordResetController);
router.post("/password-reset/reset", resetPasswordController);

export default router;
