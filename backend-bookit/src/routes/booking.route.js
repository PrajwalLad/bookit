import express from 'express'
import { createBooking } from '../controllers/booking.controller.js';

const bookingRoutes = express.Router();

bookingRoutes.post("/", createBooking);

export default bookingRoutes;