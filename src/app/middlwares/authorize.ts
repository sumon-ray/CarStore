import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
// Role-based authorization middleware
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
    //   return res.status(403).json({ message: "Forbidden: Insufficient privileges" })  && next();
    throw new AppError(httpStatus.FORBIDDEN, "Forbidden: Insufficient privileges")
    }
    next(); 
  };
};
