import { Booking } from "../models/booking.model.js";
import { Experience } from "../models/experience.model.js";
import crypto from "crypto"

export const createBooking = async (req, res) => {
  try {
    const { experienceId, slotId, user, promoCode, totalPrice } = req.body;

    if (!experienceId || !slotId || !user?.name || !user?.email) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found.",
      });
    }

    const timeSlot = experience.slots.map((slot)=>(slot.times.find(
      (t) => t._id.toString() === slotId.toString()
    )))
    console.log("Slot ID from request:", slotId);
    console.log(
      "Available Slot IDs:",
      timeSlot
    );

    if (!timeSlot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found.",
      });
    }

    if (timeSlot.isSoldOut) {
      return res.status(400).json({
        success: false,
        message: "Slot is already sold out.",
      });
    }

    const alreadyBooked = await Booking.findOne({
      experience: experienceId,
      slotId,
      "user.email": user.email,
    });

    if (alreadyBooked) {
      return res.status(400).json({
        success: false,
        message: "You have already booked this slot.",
      });
    }

    const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase();
    const refId = `BOOK-${Date.now()}-${randomPart}`;

    const booking = await Booking.create({
      experience: experienceId,
      slotId,
      user,
      promoCode,
      totalPrice,
      refId,
    });

    timeSlot.isSoldOut = true;
    await experience.save();

    res.status(201).json({
      success: true,
      message: "Booking successful!",
      refId: booking.refId,
      data: booking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({
      success: false,
      message: "Booking failed.",
      error: error.message,
    });
  }
};
