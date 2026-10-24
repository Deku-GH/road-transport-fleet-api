import { Response, NextFunction } from "express";
import { AuthRequest } from "./authenticate.middleware.js";

export const authorize = (...roles: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: "Forbidden: insufficient permissions",
      });
      return;
    }

    next();
  };
};