import User from "../model/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegistration = async (req, res, next) => {
  const { name, password, email, phone, profilePic } = req.body;
  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists, You can not create account with this email",
      });
    }

    // Password encryption
    const salt = await bcrypt.genSalt(10);
    const hashing = await bcrypt.hash(password, salt);

    user = new User({ name, password: hashing, email, phone, profilePic });

    await user.save();

    return res
      .status(200)
      .json({ success: true, messgae: "User registered successfully....!" });
  } catch (error) {
    return res.status(500).json({ success: false, messgae: "Server error" });
  }
};

const createJwtToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_TOKEN_KEY,
    { expiresIn: "1d" }
  );
};

export const login = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, messgae: "User not found" });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, messgae: "Password error" });
    }

    const token = createJwtToken(user);

    const { password, role, ...rest } = user._doc;

    return res.status(200).json({
      success: true,
      message: "Login sucess",
      token,
      role,
      data: { ...rest },
    });
  } catch (error) {
    return res.status(500).json({ success: false, messgae: "Server error" });
  }
};
