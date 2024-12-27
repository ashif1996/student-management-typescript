import { Request, Response } from "express";

import httpStatusCodes from "../utils/httpStatusCodes.js";

interface Locals {
    title: string;
}

const getAdminLogin = (req: Request, res: Response): void => {
    const locals: Locals = { title: "Admin Login | User Management" };
    res.status(httpStatusCodes.OK).render("users/adminLogin", {
        locals,
        layout: "layouts/authLayout",
    });
};

export default {
    getAdminLogin,
};