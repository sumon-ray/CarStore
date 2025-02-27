import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import { TUser } from "../modules/User/user.interface";
import { UserModel } from "../modules/User/user.model";

// Extend Express Request
export interface CustomRequest extends Request {
  user?: TUser;
}

export const authenticate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader) {
      console.log("No Authorization header provided.");
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Unauthorized: No token provided"
      );
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted token:", token);

    if (!token) {
      console.log("Token is missing after splitting Authorization header.");
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Unauthorized: No token provided"
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };
    console.log("Decoded token:", decoded);

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      console.log("User not found for decoded ID:", decoded.id);
      throw new AppError(httpStatus.UNAUTHORIZED, "User not found!");
    }

    console.log("Authenticated user:", user);
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError(httpStatus.UNAUTHORIZED, "Invalid token!"));
    }

    if (error instanceof AppError) {
      return next(error);
    }

    return next(
      new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred!"
      )
    );
  }
};
