import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./config/db.js";

dotenv.config();
connectDb();
// Initialize Express and port
const app = express();
const port = 3400 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// App Routes

// Deployment configurations

// App Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server Error!";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Listen to port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`.cyan.blue.bold);
});
