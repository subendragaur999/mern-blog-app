// name, password,email,DOB,phone,role,profilepic

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["user", "admin", "developer","guest"],
    default: "user",
  },
  profilePic: String,
});

export default mongoose.model("User", UserSchema);
