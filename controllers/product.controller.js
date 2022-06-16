const db = require("../models")
const Product = db.product

exports.create = (req, res) => {
    const product = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        categoryId: req.body.categoryId,
    }
    Product.create(product)
        .then((product) => {
            console.log(`product name : ${product.name} got inserted to the db`)
            res.status(201).send(product)
        })
        .catch((err) => {
            console.log(`Issue in inserting product named: ${product.name}`)
            res.status(500).send({
                message: "Some internal error while storing the product",
            })
        })
}
// To get all the product list from the db
//ecom/ecom/api/v1/products?name=phone&minCost=1000&maxCost=20000
exports.findAll = (req, res) => {
    let { name: productName } = req.query
    let minCost = req.query.minCost
    let maxCost = req.query.maxCost
    let promise
    if (productName) {
        promise = Product.findAll({
            where: {
                name: productName,
            },
        })
    } else if (minCost && maxCost) {
        promise = Product.findAll({
            where: {
                cost: {
                    [Op.gte]: minCost,
                    [Op.lte]: maxCost,
                },
            },
        })
    } else if (minCost) {
        promise.findAll({
            where: {
                cost: {
                    [Op.gte]: minCost,
                },
            },
        })
    } else if (maxCost) {
        promise.findAll({
            where: {
                cost: {
                    [Op.lte]: maxCost,
                },
            },
        })
    } else {
        promise = Product.findAll({})
    }
    promise
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Some internal error while retreving the prducts list",
            })
        })
}

// To get the product from the db based on the id

exports.findOne = (req, res) => {
    const productId = req.params.id
    Product.findOne({
        where: {
            id: productId,
        },
    })
        .then((product) => {
            if (!product) {
                res.status(404).send({
                    message: "Product can't be found",
                })
                return
            }
            res.status(200).send(product)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Some internal error while fetching the categories",
            })
        })
}

//To update the product in the db based on id

exports.update = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Name of the product can't be empty!!",
        })
        return
    }

    const productId = req.params.id
    const product = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
    }
    Product.update(product, {
        where: {
            id: productId,
        },
    })
        .then((updatedProduct) => {
            Product.findByPk(productId)
                .then((product) => {
                    res.status(200).send(product)
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            "Updation was successful but some internal error in fetching",
                    })
                })
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    "Some internal error while updating the product based on id",
            })
        })
}

exports.delete = (req, res) => {
    const productId = req.params.id

    Product.destroy({
        where: {
            id: productId,
        },
    })
        .then((result) => {
            res.status(200).send({
                message: "Succcesfully deleted the product",
            })
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    "Some internally error while deleting the product based on id",
            })
        })
}
