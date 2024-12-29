import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/userModel.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";
import showFlashMessages from "../utils/messageUtils.js";

interface Locals {
    title: string;
}

const getAdminLogin = (req: Request, res: Response): void => {
    const locals: Locals = { title: "Admin Login | User Management" };
    res.status(httpStatusCodes.OK).render("admin/adminLogin", {
        locals,
        layout: "layouts/authLayout",
    });
};

const adminLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const admin = await User.findOne({ email, isAdmin: true })
            .select("_id email firstName lastName isAdmin password")
            .lean();

        if (!admin) {
            return showFlashMessages({
                req,
                res,
                message: "Admin not found. Please try again.",
                status: httpStatusCodes.NOT_FOUND,
                redirectUrl: "/admin/login",
            });
        }

        const isPasswordMatch: boolean = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return showFlashMessages({
                req,
                res,
                message: "Password does not match.",
                status: httpStatusCodes.UNAUTHORIZED,
                redirectUrl: "/admin/login",
            });
        }

        req.session.admin = {
            _id: admin._id,
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName,
            isAdmin: admin.isAdmin,
        };

        res.status(httpStatusCodes.OK).redirect("/admin/dashboard");
    } catch (error) {
        console.error("Error verifying the credentials:", error as Error);

        return showFlashMessages({
            req,
            res,
            message: "An error occurred. Please try again later.",
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            redirectUrl: "/admin/login",
        });
    }
};

const getAdminDashboard = async (req: Request, res: Response): Promise<void> => {
    const locals: Locals = { title: "Admin Dashboard | User Management" };

    try {
        const perPage: number = 12;
        const page: number = parseInt(req.query.page as string, 10) || 1;

        const users = await User.aggregate([
            {$sort: {createdAt: -1}}, 
            {$skip: (perPage * page) - perPage}, 
            {$limit: perPage},
        ]).exec();

        const count: number = await User.countDocuments();

        res.render("admin/dashboard", {
            locals,
            users,
            count,
            current: page,
            pages: Math.ceil(count / perPage),
            layout: "layouts/adminLayout",
        });
    } catch (error) {
        console.error("Error verifying the credentials:", error as Error);

        return showFlashMessages({
            req,
            res,
            message: "An error occurred. Please try again later.",
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            redirectUrl: "/admin/login",
        });
    }
};

const adminLogout = (req: Request, res: Response): void => {
    req.session.destroy((error) => {
        if (error) {
            console.log("Error destroying the session:", error as Error);
        }

        return res.redirect("/admin/login");
    });
};

const getAddUser = (req: Request, res: Response): void => {
    const locals: Locals = { title: "Add User | User Management" };

    res.render("admin/add", {
        locals,
        layout: "layouts/adminLayout",
    });
};

const addUser = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, pwd, pwdConf } = req.body;

    try  {
        const existingUser = await User.exists({ email });
        if (existingUser) {
            return showFlashMessages({
                req,
                res,
                message: "Email already taken.",
                status: httpStatusCodes.BAD_REQUEST,
                redirectUrl: "/admin/addUser",
            });
        }

        if (pwd !== pwdConf) {
            return showFlashMessages({
                req,
                res,
                message: "Passwords do not match.",
                status: httpStatusCodes.BAD_REQUEST,
                redirectUrl: "/admin/addUser",
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
            redirectUrl: "/admin/dashboard",
        });
    } catch (error) {
        console.error("Error registering the user:", error as Error);

        return showFlashMessages({
            req,
            res,
            message: "An error occurred. Please try again later.",
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            redirectUrl: "/admin/addUser",
        });
    }
};

const viewUser = async (req: Request, res: Response): Promise<void> => {
    const locals: Locals = { title: "View User | User Management" };
    const { id } = req.params;

    try {
        const user = await User.findById(id)
            .select("_id firstName lastName email createdAt updatedAt")
            .lean();

        res.render("admin/view", {
            locals,
            layout: "layouts/adminLayout",
            user,
        });
    } catch (error) {
        console.error("Error viewing the user:", error as Error);

        return showFlashMessages({
            req,
            res,
            message: "An error occurred. Please try again later.",
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            redirectUrl: "/admin/dashboard",
        });
    }
};

const getEditUser = async (req: Request, res: Response): Promise<void> => {
    const locals: Locals = { title: "Edit User | User Management" };
    const { id } = req.params;

    try {
        const user = await User.findById(id)
            .select("_id firstName lastName email updatedAt")
            .lean();

        if (!user) {
            return showFlashMessages({
                req,
                res,
                message: "User not found. Please try again.",
                status: httpStatusCodes.NOT_FOUND,
                redirectUrl: "/admin/dashboard",
            });
        }
        
        res.render("admin/edit", {
            locals,
            layout: "layouts/adminLayout",
            user,
        });
    } catch (error) {
        console.error("Error fetching edit user:", error as Error);

        return showFlashMessages({
            req,
            res,
            message: "An error occurred. Please try again later.",
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            redirectUrl: "/admin/dashboard",
        });
    }
};

const editUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        await User.findByIdAndUpdate(
            id,
            { ...req.body, updatedAt: Date.now() },
        );

        return showFlashMessages({
            req,
            res,
            type: "success",
            message: "User updated successfully.",
            status: httpStatusCodes.OK,
            redirectUrl: "/admin/dashboard",
        });
    } catch (error) {
        console.error("Error updating the user:", error as Error);

        return showFlashMessages({
            req,
            res,
            message: "An error occurred. Please try again later.",
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            redirectUrl: "/admin/dashboard",
        });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        await User.deleteOne({ _id: id });

        return showFlashMessages({
            req,
            res,
            type: "success",
            message: "User deleted successfully.",
            status: httpStatusCodes.OK,
            redirectUrl: "/admin/dashboard",
        });
    } catch (error) {
        console.error("Error deleting the user:", error as Error);

        return showFlashMessages({
            req,
            res,
            message: "An error occurred. Please try again later.",
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            redirectUrl: "/admin/dashboard",
        });
    }
};

const searchUser = async (req: Request, res: Response): Promise<void> => {
    const locals: Locals = { title: "Search User Data | User Management" };
    const searchTerm: string = req.body.searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    try {
        const users = await User.find({
            $or: [
                { firstName: { $regex: searchTerm, $options: "i" } },
                { lastName: { $regex: searchTerm, $options: "i" } },
                { email: { $regex: searchTerm, $options: "i" } },
            ]
        })
        .select("_id firstName lastName email")
        .lean();

        res.render("admin/search", {
            locals,
            users,
            layout: 'layouts/adminLayout',
        });
    } catch (error) {
        console.error("Error deleting the user:", error as Error);

        return showFlashMessages({
            req,
            res,
            message: "An error occurred. Please try again later.",
            status: httpStatusCodes.INTERNAL_SERVER_ERROR,
            redirectUrl: "/admin/dashboard",
        });
    }
};

export default {
    getAdminLogin,
    adminLogin,
    getAdminDashboard,
    adminLogout,
    getAddUser,
    addUser,
    viewUser,
    getEditUser,
    editUser,
    deleteUser,
    searchUser,
};