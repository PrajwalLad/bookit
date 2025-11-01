import express from "express";
import cors from 'cors'
import experienceRoutes from "./routes/experience.route.js";
import userRoutes from "./routes/user.route.js"
import bookingRoutes from "./routes/booking.route.js";

const app = express();
app.use(cors())
app.use(express.json());

app.use("/experiences", experienceRoutes);
app.use("/booking", bookingRoutes)
app.use("/user", userRoutes)

export default app;