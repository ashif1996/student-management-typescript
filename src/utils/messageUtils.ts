import express from "express";

const showFlashMessages = ({
    req,
    res,
    type = "error",
    message,
    status,
    redirectUrl = null,
}: {
    req: express.Request;
    res: express.Response;
    type?: string;
    message: string;
    status: number;
    redirectUrl?: string | null;
}) => {
    req.flash(type, message);

    if (redirectUrl) {
        return res.status(status).redirect(redirectUrl);
    }
};

export default showFlashMessages;