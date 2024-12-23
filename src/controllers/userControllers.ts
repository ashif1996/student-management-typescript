import { Request, Response } from "express";

import httpStatusCodes from "../utils/httpStatusCodes.js";

const getUserLogin = (req: Request, res: Response): void => {
    const locals: Record<string, any> = { title: "User Login | User Management" };
    return res.status(httpStatusCodes.OK).render("users/userLogin", {
        locals,
        layout: "layouts/authLayout",
    });
};

export default {
    getUserLogin,
};