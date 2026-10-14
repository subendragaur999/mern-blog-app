import User from "../model/User.model.js";
import jwt from "jsonwebtoken";

export const authorize = (req, res, next) => {
  const authToken = req.headers.authorization;

  //   If you don't have the token
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(400)
      .json({ success: false, message: "No token, Authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];

    // Token verification
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);

    req.userId = decoded.id;
    req.name = decoded.name;
    req.role = decoded.role;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Token, Please Login Again",
        error,
      });
    }
  }
};

export const restrict = (role) => (req, res, next) => {
  try {
    const userRole = req.role;

    if (userRole === "admin" && role.includes("admin")) {
      next();
    } else if (userRole === "user" && role.includes("user")) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Access denied...!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
