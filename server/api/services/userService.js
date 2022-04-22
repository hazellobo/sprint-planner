import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

/**
 * Creation of a User
 * @param {*} email
 * @param {*} password
 * @param {*} role
 * @returns
 */
export const createUser = (emailId, password, role) => {
  const user = User.create({
    emailId,
    password,
    role,
  });
  return user;
};

/**
 * Get User
 * @param {*} emailId
 * @returns
 */
export const userExists = (emailId) => {
  return User.findOne({ emailId });
};

/**
 * Get HashedPassword
 * @param {*} password
 * @returns
 */
export const getHashedPassword = (password) => {
  const salt = bcrypt.genSalt(10);
  const hashed = bcrypt.hash(password, salt);
  return hashed;
};

/**
 * Compares hashedPasswords
 * @param {*} password
 * @param {*} hashedPassword
 * @returns
 */
export const compareHashedPassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Token Generation
 * @param {*} id
 * @returns
 */
export const generateToken = (id) => {
  return jwt.sign({ id }, "123", {
    expiresIn: "30d",
  });
};
