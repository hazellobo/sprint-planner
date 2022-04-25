import express from "express";
import {registerUser,loginUser,getMe} from "../controllers/userController.js";
import { protect } from "../controllers/authCheck.js";

const router = express.Router();

//user registration
router
  .post("/", registerUser)
  .post("/login", loginUser)
  .get("/getMe",protect, getMe);

export default router;
