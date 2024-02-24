import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  createVehicle,
  deleteVehicle,
  getVehicles,
  updateVehicle,
} from "../controllers/vehicles.controller.js";

// initialize Router
const router = express.Router();

router.post("/create/vehicle", verifyToken, createVehicle);
router.get("/get/vehicles", getVehicles);
router.put("/update/vehicle/:id", verifyToken, updateVehicle);
router.delete("/delete/vehicle/:id", verifyToken, deleteVehicle);

export default router;
