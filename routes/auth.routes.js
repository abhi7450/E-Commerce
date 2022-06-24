const controller = require("../controllers/auth.controller");
const { verifySignUp } = require("../middlewares");
module.exports = (app) => {
    app.post(
        "/ecom/api/v1/auth/signup",
        [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
        controller.signup
    );
    app.post("/ecom/api/v1/auth/signin", controller.signin);
};
