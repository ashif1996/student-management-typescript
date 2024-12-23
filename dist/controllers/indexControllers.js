import httpStatusCodes from "../utils/httpStatusCodes.js";
const getHome = (req, res) => {
    const locals = { title: "Home | User Management" };
    return res.status(httpStatusCodes.OK).render("index", {
        locals,
        layout: "layouts/userLayout",
    });
};
export default {
    getHome,
};
//# sourceMappingURL=indexControllers.js.map