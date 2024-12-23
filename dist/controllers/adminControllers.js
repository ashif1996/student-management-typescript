import httpStatusCodes from "../utils/httpStatusCodes.js";
const getAdminLogin = (req, res) => {
    const locals = { title: "Admin Login | User Management" };
    return res.status(httpStatusCodes.OK).render("users/adminLogin", {
        locals,
        layout: "layouts/authLayout",
    });
};
export default {
    getAdminLogin,
};
//# sourceMappingURL=adminControllers.js.map