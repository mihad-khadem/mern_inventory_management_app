import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Public auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
