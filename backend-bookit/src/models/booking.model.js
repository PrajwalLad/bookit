import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  experience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Experience",
    required: true,
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  promoCode: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "completed",
  },
  refId:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Booking = mongoose.model("Booking", bookingSchema);
