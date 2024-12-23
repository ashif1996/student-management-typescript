import express from "express";
const router = express.Router();

import userControllers from "../controllers/userControllers.js";

router.get("/login", userControllers.getUserLogin);

export default router;