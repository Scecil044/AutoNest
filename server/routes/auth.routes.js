import express from "express";
import { login, logout, registerUser } from "../controllers/auth.controller.js";
import { rateLimit } from "express-rate-limit";
import { verifyToken } from "../utils/verifyToken.js";

// initialize Router
const router = express.Router();

// Routes
router.post("/register", rateLimit(60 * 60 * 1000, "secs", 2), registerUser);
router.post("/login", login);
router.get("/logout", verifyToken, logout);

export default router;
