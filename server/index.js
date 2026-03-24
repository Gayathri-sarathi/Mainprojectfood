import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import userRoutes from "./routes/userRoutes.js";
import foodRoutes from "./routes/food.js";
import orderRoutes from "./routes/order.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => res.send("Backend server connected"));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/order", orderRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));