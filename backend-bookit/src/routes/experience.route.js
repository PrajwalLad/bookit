import express from 'express'
import { displayDetails, listExperiences } from '../controllers/experience.controller.js';

const experienceRoutes = express.Router();

experienceRoutes.get("/", listExperiences);
experienceRoutes.get("/:id", displayDetails);

export default experienceRoutes;