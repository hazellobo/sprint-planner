import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";


export const registerUser = async (req, res) => {
  const { emailId, password, role } = req.body;

  if (!emailId || !password || !role) {
    errorHandler("Please add all fields", res);
  }

  // Check if user already exists
  const userExists = await User.findOne({ emailId });
  if (userExists) {
    errorHandler("User already exists", res);
  }

  // Password hash logic
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //User Creation
  const user = await User.create({
    emailId,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      role: user.role,
      emailId: user.emailId,
      token: generateToken(user.id),
    });
  } else {
    errorHandler("Invalid user data", res);
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
export const loginUser = async (req, res) => {
  const { emailId, password } = req.body;

  // Check for user email
  const user = await User.findOne({ emailId });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      emailId: user.emailId,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    errorHandler("Invalid credentials", res);
  }
};

// @desc    Get user data
// @route   GET /api/users/me
export const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// Token Generation
const generateToken = (id) => {
  return jwt.sign({ id }, "123", {
    expiresIn: "30d",
  });
};
