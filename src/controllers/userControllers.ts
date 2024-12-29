import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/userModel.js";

import httpStatusCodes from "../utils/httpStatusCodes.js";
import showFlashMessages from "../utils/messageUtils.js";

interface Locals {
    title: string;
}

const getUserLogin = (req: Request, res: Response): void => {
    const locals: Locals = { title: "User Login | User Management" };
    res.status(httpStatusCodes.OK).render("users/userLogin", {
        locals,
        layout: "layouts/authLayout",
    });
};

const userLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, isAdmin: false })
            .select("_id email firstName lastName isAdmin password")
            .lean();

        if (!user) {
            return showFlashMessages({
                req,
                res,
                message: "User not found. Please try again.",
                status: httpStatusCodes.NOT_FOUND,
                redirectUrl: "/user/login",
            });
        }

        const isPasswordMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return showFlashMessages({
                req,
                res,
                message: "Password does not match.",
                status: httpStatusCodes.UNAUTHORIZED,
                redirectUrl: "/user/login",
            });
        }

        req.session.user = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
        };

        res.status(httpStatusCodes.OK).redirect("/");
    } catch (error) {
        console.error("Error verifying the credentials:", error as Error);

        return showFlashMessages({
            req,
            res,
            message: "An error occurred. Please try again later.",
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            redirectUrl: "/user/login",
        });
    }
};

const getUserSignup = (req: Request, res: Response): void => {
    const locals: Locals = { title: "User Signup | User Management" };
    res.status(httpStatusCodes.OK).render("users/signup", {
        locals,
        layout: "layouts/authLayout",
    });
};

const userSignup = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, pwd, pwdConf } = req.body;

    try  {
        const existingUser = await User.exists({ email });
        if (existingUser) {
            return showFlashMessages({
                req,
                res,
                message: "Email already taken.",
                status: httpStatusCodes.BAD_REQUEST,
                redirectUrl: "/user/signup",
            });
        }

        if (pwd !== pwdConf) {
            return showFlashMessages({
                req,
                res,
                message: "Passwords do not match.",
                status: httpStatusCodes.BAD_REQUEST,
                redirectUrl: "/user/signup",
            });
        }

        await User.create({
            firstName,
            lastName,
            email,
            password: pwd,
        });

        return showFlashMessages({
            req,
            res,
            type: "success",
            message: "User registration successfull.",
            status: httpStatusCodes.CREATED,
            redirectUrl: "/user/login",
        });
    } catch (error) {
        console.error("Error registering the user:", error as Error);

        return showFlashMessages({
            req,
            res,
            message: "An error occurred. Please try again later.",
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            redirectUrl: "/user/signup",
        });
    }
};

const userLogout = (req: Request, res: Response): void => {
    req.session.destroy((error) => {
        if (error) {
            console.log("Error destroying the session:", error as Error);
        }

        return res.redirect("/user/login");
    });
};

const getProfile = async (req: Request, res: Response): Promise<void> => {
    const locals: Locals = { title: 'User Profile' };
    const email: string | null = req.session?.user?.email || null;

    try {
        const user = await User.findOne({ email })
            .select("_id email firstName lastName")
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

        res.render("users/profile", {
            locals,
            layout: "layouts/userLayout",
            user,
        });
    } catch (error) {
        console.error("An error occurred:", error as Error);

        return showFlashMessages({
            req,
            res,
            message: "An error occurred. Please try again later.",
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            redirectUrl: "/",
        });
    }
};

export default {
    getUserLogin,
    userLogin,
    getUserSignup,
    userSignup,
    userLogout,
    getProfile,
};