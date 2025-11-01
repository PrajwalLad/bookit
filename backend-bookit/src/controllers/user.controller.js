import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already exists",
        data: existingUser,
      });
    }

    const user = await User.create({ fullName, email });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};
