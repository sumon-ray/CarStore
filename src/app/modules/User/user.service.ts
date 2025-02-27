import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (payload: TUser) => {
  const { email } = payload;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error("Email is already in use");
  }
  const result = await UserModel.create(payload);
  return result;
};

const login = async (email: string, password: string, res: Response) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("User Not Found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  // ✅ **Set-Cookie হেডারে টোকেন পাঠানো হচ্ছে**
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // **প্রোডাকশনে HTTPS-এ কুকি কাজ করবে**
    sameSite: "strict", // **CSRF এটাক প্রতিরোধ করবে**
    maxAge: 7 * 24 * 60 * 60 * 1000, // **7 দিন পর্যন্ত কুকি থাকবে**
  });

  return {
    token,
    // message: "Login successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// get all users
const getAllUsers = async () => {
  const users = await UserModel.find();
  return users;
};

export const UserServices = {
  createUser,
  login,
  getAllUsers
};
