import express from "express";
import User from "../models/User.js";

const router = express.Router();

// TEST
router.get("/test", (req, res) => {
  res.send("User route working");
});

// REGISTER
// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "All fields required" 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "User already exists" 
      });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.log("Register Error ❌", error);
    res.status(500).json({ 
      success: false,
      message: "Server error"
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      token: "dummy-token",
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;