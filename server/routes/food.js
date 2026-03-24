import express from "express";
import Food from "../models/Food.js";

const router = express.Router();

// Add food
router.post("/add", async (req, res) => {
  try {
    const { name, price, image, category, description } = req.body;

    const newFood = new Food({
      name,
      price,
      image,
      category,
      description
    });

    await newFood.save();

    res.status(201).json({
      message: "Food added successfully",
      food: newFood
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all foods
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Food deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;