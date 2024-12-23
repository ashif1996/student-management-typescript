import express from "express";
const router = express.Router();

import indexControllers from "../controllers/indexControllers.js";

router.get("/", indexControllers.getHome);

export default router;