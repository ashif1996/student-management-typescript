import express from "express";
const router = express.Router();

import adminControllers from "../controllers/adminControllers.js";

router.get("/login", adminControllers.getAdminLogin);

export default router;