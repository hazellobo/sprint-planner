import * as userService from "../services/userService.js";
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
    const { emailId, password, role } = req.body;

    if (!emailId || !password || !role) {
      errorHandler("Please add all fields", res);
    }

    // Check if user already exists
    const userExists = await userService.userExists(id);
    if (userExists) {
      errorHandler("User already exists", res);
    }

    // Generating hashed password
    const hashedPassword = userService.getHashedPassword(password);

    //Registering User
    const registeredUser = await userService.createUser(
      emailId,
      hashedPassword,
      role
    );

    if (registeredUser) {
      setResponse({ user, token: generateToken(user.id) }, res);
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
  const { emailId, password } = req.body;

  // Check if user with given emailId exists
  const user = await userService.userExists(emailId)
  if (user && (await userService.compareHashedPassword(password,user.password))) {
    setResponse({ user, token: generateToken(user.id) }, res);
  } else {
    errorHandler("Invalid credentials", res);
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
