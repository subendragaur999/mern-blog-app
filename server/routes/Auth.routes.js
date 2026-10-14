import express from "express";
import { login, userRegistration } from "../controller/auth.controller.js";

const route = express.Router();

// http://localhost:8080/api/v1/auth/registeruser
route.post("/registeruser", userRegistration);
// http://localhost:8080/api/v1/auth/login
route.post("/login", login);

export default route;
