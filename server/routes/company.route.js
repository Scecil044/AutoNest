import express from "express";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  updateCompany,
} from "../controllers/companies.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// Routes
router.get("/get/companies", verifyToken, getCompanies);
router.post("/create/company", verifyToken, createCompany);
router.put("/update/company/:companyId", verifyToken, updateCompany);
router.delete("/delete/company/:companyId", verifyToken, deleteCompany);
export default router;
