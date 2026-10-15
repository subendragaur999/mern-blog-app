import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import BlogRoutes from "./routes/Blog.routes.js";
import AuthRoutes from "./routes/Auth.routes.js";
import UserRoutes from "./routes/User.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected...!`);
  } catch (error) {
    console.log(error);
process.exit(1);  
}
};

const corsPolicy = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type"],
};

// Middlewares
app.use(cors(corsPolicy));
app.use(express.json());
app.get("/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  if (!databaseConnected) {
    return res.status(503).json({
      status: "unhealthy",
      database: "disconnected",
    });
  }

  return res.status(200).json({
    status: "healthy",
    database: "connected",
  });
});
app.use("/api/v1/blog", BlogRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", UserRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running in ${port}`);
  });
});
