const productController = require("../controllers/product.controller");
const { requestValidator, authJwt } = require("../middlewares");
module.exports = (app) => {
    //Route for creating a product
    app.post(
        "/ecom/api/v1/products",
        [requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin],
        productController.create
    );
    //Routes for geting list of product
    app.get("/ecom/api/v1/products", productController.findAll);
    //Route for getting a product by id
    app.get("/ecom/api/v1/products/:id", productController.findOne);
    //Route for updating a product by id
    app.put(
        "/ecom/api/v1/products/:id",
        [requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin],
        productController.update
    );
    //Route for deleting a product by id
    app.delete("/ecom/api/v1/products/:id", [authJwt.verifyToken, authJwt.isAdmin], productController.delete);

    app.get("/ecom/api/v1/categories/:categoryId/products", productController.getProductUnderCategory);
};
