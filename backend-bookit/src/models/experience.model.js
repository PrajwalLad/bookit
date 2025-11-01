import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  times: [
    {
      time: { type: String, required: true },
      isSoldOut: { type: Boolean, default: false },
      seatsLeft: { type: Number, default: 10 },
    },
  ],
});

const experienceSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    price: Number,
    category: String,
    rating: Number,
    image: String,
    description: String,
    slots: [slotSchema],
  },
  { timestamps: true }
);

export const Experience = mongoose.model("Experience", experienceSchema);

