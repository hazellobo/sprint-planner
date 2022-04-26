import * as userService from "../services/user-service.js";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

/**
 * Error handler function to display Error
 * @param {*} message
 * @param {*} response
 */
const errorHandler = (message, response) => {
  response.status(500);
  response.json({ error: message });
};

/**
 * Response handler function to display Success
 * @param {*} data
 * @param {*} response
 */
const setResponse = (data, response) => {
  response.status(200);
  response.json(data);
};

// @desc    New User Registration
// @route   POST /api/users
export const registerUser = async (req, res) => {
  try {
    const { name, emailId, password, role } = req.body;

    if (!name || !emailId || !password || !role) {
      errorHandler("Please add all fields", res);
    }

    // Check if user already exists
    const userExists = await userService.userExists(emailId);
    if (userExists) {
      errorHandler("User already exists", res);
    }

    // Generating hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Registering User
    const registeredUser = await userService.createUser(
      name,
      emailId,
      hashedPassword,
      role
    );

    if (registeredUser) {
      setResponse(
        { registeredUser, token: generateToken(registeredUser.id) },
        res
      );
    } else {
      errorHandler("Invalid user data", res);
    }
  } catch (error) {
    errorHandler(error.message, res);
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Check if user with given emailId exists
    const user = await userService.userExists(emailId);
    if (!emailId || !password) {
      errorHandler("Email and Password are required", res);
    } else if (user && (await bcrypt.compare(password, user.password))) {
      setResponse({ user, token: generateToken(user.id) }, res);
      console.log("Login Successful");
    } else {
      errorHandler("Invalid Credentials", res);
    }
  } catch (error) {
    errorHandler(error.message, res);
  }
};

// @desc    Get user data
// @route   GET /api/users/me
export const getMe = async (req, res) => {
  setResponse(req.user, res);
};

// Token Generation
const generateToken = (id) => {
  return userService.generateToken(id);
};

export const getAllUsers = async (response, request) => {
  try {
    const query = {};
    const users = await userService.getAllUsers(query);
    setResponse(users, response);
  } catch (error) {
    errorHandler(error.message, response);
  }
};
