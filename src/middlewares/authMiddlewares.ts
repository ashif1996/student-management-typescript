import { Request, Response, NextFunction } from "express";
import User from "../models/userModel.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";
import showFlashMessages from "../utils/messageUtils.js";

// Middleware to check user authentication
const isUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.session.user) {
        return showFlashMessages({
            req,
            res,
            message: "Please login to access this page.",
            status: httpStatusCodes.UNAUTHORIZED,
            redirectUrl: "/user/login",
        });
      }
  
      if (req.session.user.isAdmin) {
        return showFlashMessages({
            req,
            res,
            message: "Access denied. This page is only for regular users.",
            status: httpStatusCodes.UNAUTHORIZED,
            redirectUrl: "/user/login",
        });
      }
  
      const user = await User.findById(req.session.user._id)
        .select("_id")
        .lean();

      if (!user) {
        return showFlashMessages({
            req,
            res,
            message: "User not found.",
            status: httpStatusCodes.NOT_FOUND,
            redirectUrl: "/user/login",
        });
      }
  
      next();
    } catch (error) {
        console.error("An error occurred while checking authentication:", error as Error);

        return showFlashMessages({
            req,
            res,
            message: "An error occurred. Please try again later.",
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            redirectUrl: "/user/login",
        });
    }
};
  
// Middleware to check if user is an admin
const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.admin) {
        return showFlashMessages({
            req,
            res,
            message: "You must be logged in to access the page.",
            status: httpStatusCodes.UNAUTHORIZED,
            redirectUrl: "/admin/login",
        });
    }

    if (!req.session.admin.isAdmin) {
        return showFlashMessages({
            req,
            res,
            message: "Access denied. Admin privileges required.",
            status: httpStatusCodes.UNAUTHORIZED,
            redirectUrl: "/admin/login",
        });
    }

    next();
};

export {
    isUser,
    isAdmin,
};