import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./config/db.js";
import path from "path";
// importing routes
import vehicleRoutes from "./routes/vehicle.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.route.js";
import config from "./config/config.js";


dotenv.config();
connectDb();
// Initialize Express and port
const app = express();
const port = 3400 || process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// App Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/companies", companyRoutes);

// Deployment configurations
app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

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
