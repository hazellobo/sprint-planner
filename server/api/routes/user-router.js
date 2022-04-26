import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
} from "../controllers/user-controller.js";
import { protect } from "../controllers/authCheck.js";

const router = express.Router();

//user registration
router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/getMe", protect, getMe)
  .get("/All", getAllUsers);

export default router;
