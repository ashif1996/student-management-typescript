import express from "express";
const router = express.Router();

import { isAdmin } from "../middlewares/authMiddlewares.js";
import adminControllers from "../controllers/adminControllers.js";

router.route("/login")
    .get(adminControllers.getAdminLogin)
    .post(adminControllers.adminLogin);

router.get("/logout", adminControllers.adminLogout);

router.get("/dashboard", isAdmin, adminControllers.getAdminDashboard);

router.route("/addUser")
    .get(isAdmin, adminControllers.getAddUser)
    .post(isAdmin, adminControllers.addUser);

router.get("/viewUser/:id", isAdmin, adminControllers.viewUser);

router.route("/editUser/:id")
    .get(isAdmin, adminControllers.getEditUser)
    .put(isAdmin, adminControllers.editUser);

router.post("/deleteUser/:id", isAdmin, adminControllers.deleteUser);

router.post("/searchUser", isAdmin, adminControllers.searchUser);

export default router;