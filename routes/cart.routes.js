const { authJwt } = require("../middlewares");
const cartController = require("../controllers/cart.controller");
module.exports = (app) => {
    app.post("/ecom/api/v1/carts", [authJwt.verifyToken], cartController.create);
    app.put("/ecom/api/v1/carts/:id", [authJwt.verifyToken], cartController.update);
    app.get("/ecom/api/v1/carts/:cartsId", [authJwt.verifyToken], cartController.getCart);
};
