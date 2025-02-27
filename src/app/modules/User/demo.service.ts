import bcrypt from "bcrypt";
import { Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import ApiError from "../../utils/ApiError"; // Ensure this file exists
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (payload: TUser) => {
  const { email, password } = payload;

  // Validate password length (optional)
  if (password.length < 8) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Password must be at least 8 characters long"
    );
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already in use");
  }

  // Hash password before storing
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Generated Hashed Password:", hashedPassword); // Debugging log

  payload.password = hashedPassword;

  const result = await UserModel.create(payload);
  return result;
};

const login = async (email: string, password: string, res: Response) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User Not Found");
  }

  // Compare entered password with stored hashed password
  console.log("Entered Password:", password);
  console.log("Stored Password Hash:", user.password); // Debugging log
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("Password Valid:", isPasswordValid); // Debugging log to check if comparison works
  

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  // Set token in cookie for authentication
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Works with HTTPS in production
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const getAllUsers = async () => {
  const users = await UserModel.find();
  return users;
};

export const UserServices = {
  createUser,
  login,
  getAllUsers,
};
