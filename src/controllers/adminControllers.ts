import { Request, Response } from "express";

import httpStatusCodes from "../utils/httpStatusCodes.js";

const getAdminLogin = (req: Request, res: Response): void => {
    const locals: Record<string, any> = { title: "Admin Login | User Management" };
    return res.status(httpStatusCodes.OK).render("users/adminLogin", {
        locals,
        layout: "layouts/authLayout",
    });
};

export default {
    getAdminLogin,
};