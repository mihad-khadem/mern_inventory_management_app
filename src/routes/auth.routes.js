import express from "express";
import {
  createUserController,
  loginUserController,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Public auth routes
router.post("/register", createUserController);
router.post("/login", loginUserController);

export default router;
