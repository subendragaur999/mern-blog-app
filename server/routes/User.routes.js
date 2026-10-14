import express from "express";
import {
  deleteUserProfile,
  getAllUsers,
  getSingleUserProfile,
  updateUser,
} from "../controller/User.controller.js";
import { authorize, restrict } from "../auth/VerifyToken.auth.js";

const router = express.Router();

// http://localhost:8080/api/v1/user/updateuser/12345
router.put("/updateuser/:id", authorize, updateUser);
// http://localhost:8080/api/v1/user/deleteuser/123456
router.delete("/deleteuser/:id", authorize,restrict(["admin"]), deleteUserProfile);
// http://localhost:8080/api/v1/user/getallusers
router.get("/getallusers",authorize, restrict(["admin"]), getAllUsers)
// http://localhost:8080/api/v1/user/getsingleuser/12345
router.get("/getsingleuser/:id",authorize, restrict(["admin","user"]), getSingleUserProfile)

export default router;
