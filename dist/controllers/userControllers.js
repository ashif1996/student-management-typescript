import httpStatusCodes from "../utils/httpStatusCodes.js";
const getUserLogin = (req, res) => {
    const locals = { title: "User Login | User Management" };
    return res.status(httpStatusCodes.OK).render("users/userLogin", {
        locals,
        layout: "layouts/authLayout",
    });
};
export default {
    getUserLogin,
};
//# sourceMappingURL=userControllers.js.map