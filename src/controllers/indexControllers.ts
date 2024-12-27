import { Request, Response } from "express";

import httpStatusCodes from "../utils/httpStatusCodes.js";

interface Locals {
    title: string;
}

const getHome = (req: Request, res: Response): void => {
    const locals: Locals = { title: "Home | User Management" };
    const user = req.session.user || null;

    res.status(httpStatusCodes.OK).render("index", {
        locals,
        user,
        layout: "layouts/userLayout",
    });
};

export default {
    getHome,
};