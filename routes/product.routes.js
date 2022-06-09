const productController = require("../controllers/product.controller")
module.exports = (app) => {
    //Route for creating a product
    app.post("/ecom/api/v1/products", productController.create)
    //Routes for geting list of product
    app.get("/ecom/api/v1/products", productController.findAll)
    //Route for getting a product by id
    app.get("/ecom/api/v1/products/:id", productController.findOne)
    //Route for updating a product by id
    app.put("/ecom/api/v1/products/:id", productController.update)
    //Route for deleting a product by id
    app.put("/ecom/api/v1/products/:id", productController.delete)
}
