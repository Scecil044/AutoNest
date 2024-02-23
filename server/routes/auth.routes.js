import express from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { rateLimit } from "express-rate-limit";

// initialize Router
const router = express.Router();

// Routes
router.post("/register", rateLimit(60 * 60 * 1000, "secs", 2), registerUser);

export default router;
