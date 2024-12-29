import dotenv from "dotenv";
dotenv.config();

import connectToDatabase from "./config/dbConfig.js";
connectToDatabase();

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import session from "express-session";
import flash from "connect-flash";
import expressLayouts from "express-ejs-layouts";
import methodOverride from "method-override";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
app.use(flash());

// Get the directory of the current file (app.js)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "../public")));
app.use(expressLayouts);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.successMessage = req.flash("success");
    res.locals.errorMessage = req.flash("error");
    next();
});
app.use(methodOverride("_method"));

import indexRoutes from "./routes/indexRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

interface Locals {
    title: string;
}

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const locals: Locals = { title: "404 | Page Not Found" };
    res.status(404).render("404", {
        locals,
        layout: "layouts/errorLayout",
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});