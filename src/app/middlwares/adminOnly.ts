import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
export const adminOnly = (req:Request, res:Response, next: NextFunction)=>{
  const user = (req as any).user
  if (user.role !=="admin") {
    throw new AppError(httpStatus.FORBIDDEN, "Access denied: only Admins can delete the blog")
  }
  next()
}