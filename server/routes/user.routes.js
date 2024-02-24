import express from "express";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

// initialize Router
const router = express.Router();

router.get("/get/users", verifyToken, getUsers);
router.put("/update/user/:id", verifyToken, updateUser);
router.delete("/delete/user/:id", verifyToken, deleteUser);

export default router;
