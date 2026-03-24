// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  userId: { type: String },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);