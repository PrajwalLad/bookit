import { Experience } from "../models/experience.model.js";

export const listExperiences = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = {};

    if (search) {
      filter = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      };
    }
    const experiences = await Experience.find(filter);

    return res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
      error: error.message,
    });
  }
};

export const displayDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch the details of experience",
      error: error.message,
    });
  }
};
