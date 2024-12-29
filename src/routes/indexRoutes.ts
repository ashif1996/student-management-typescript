import express from "express";
const router = express.Router();

import { isUser } from "../middlewares/authMiddlewares.js";
import indexControllers from "../controllers/indexControllers.js";

router.get("/", isUser, indexControllers.getHome);

export default router;