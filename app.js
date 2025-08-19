import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend dev URL
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

// Routes
import authRoutes from "./routes/auth.js";
import cityRoutes from "./routes/cities.js";
import carRoutes from "./routes/cars.js";
import bookingRoutes from "./routes/bookings.js";

app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 5000, () => console.log("✅ Server running")))
  .catch(err => console.error(err));
