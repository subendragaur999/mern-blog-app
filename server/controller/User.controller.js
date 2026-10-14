import mongoose from "mongoose";
import User from "../model/User.model.js";

export const updateUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found with this ID" });
    }

    // if(loggedinuser.id != userId){err}

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "User profile updated...!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error...!" });
  }
};

export const deleteUserProfile = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found with this ID" });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({ success: true, message: "User deleted...!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    return res
      .status(200)
      .json({ success: true, message: "All users found", data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSingleUserProfile = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).select("-password");

    return res
      .status(200)
      .json({ success: true, message: "User info found", data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
