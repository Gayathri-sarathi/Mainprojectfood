// routes/order.js
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Create new order
router.post("/create", async (req, res) => {
  try {
    const { items, totalPrice, paymentMethod, userId } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "No items provided" 
      });
    }

    const orderItems = items.map(item => ({
      foodId: item.foodId,
      quantity: Number(item.quantity)
    }));

    const newOrder = new Order({
      items: orderItems,
      totalPrice: Number(totalPrice),
      paymentMethod,
      userId
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder
    });

  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message
    });
  }
});

export default router;