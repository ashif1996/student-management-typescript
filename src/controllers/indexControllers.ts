import { Request, Response } from "express";

import httpStatusCodes from "../utils/httpStatusCodes.js";

const getHome = (req: Request, res: Response): void => {
    const locals: Record<string, any> = { title: "Home | User Management" };
    return res.status(httpStatusCodes.OK).render("index", {
        locals,
        layout: "layouts/userLayout",
    });
};

export default {
    getHome,
};