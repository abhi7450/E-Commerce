const db = require("../models");

const Product = db.product;
const Cart = db.cart;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const cart = {
        userId: req.userId, //we are getting the userId from middleware from signup func
    };
    Cart.create(cart)
        .then((cart) => {
            res.status(201).send();
        })
        .catch((err) => {
            res.status(500).send({ message: "Some Internal server error happened" });
        });
};

exports.update = (req, res) => {
    const cartId = req.params.id;
    Cart.findByPk(cartId)
        .then((cart) => {
            Product.findAll({
                where: {
                    id: req.body.productIds,
                },
            })
                .then((items) => {
                    if (!items) {
                        res.status(400).send({
                            message: "Items trying to add does not exists",
                        });
                    }
                    cart.setProducts(items).then(() => {
                        let cost = 0;
                        const ProductSelected = [];
                        cart.getProducts().then((products) => {
                            for (let i = 0; i < products.length; i++) {
                                cost = cost + products[i].cost;
                                ProductSelected.push({
                                    id: products[i].id,
                                    name: products[i].name,
                                    cost: products.cost,
                                });
                            }
                            res.status(200).send({
                                id: cart.id,
                                ProductSelected: ProductSelected,
                                cost: cost,
                            });
                        });
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Some internal server error happened while fetching Product details.",
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Some internal server error happened while fetching cart details.",
            });
        });
};

exports.getCart = (req, res) => {
    Cart.findByPk(req.params.cardId).then((cart) => {
        let cost = 0;
        const ProductSelected = [];
        cart.getProducts().then((products) => {
            for (let i = 0; i < products.length; i++) {
                cost = cost + products[i].cost;
                ProductSelected.push({
                    id: products[i].id,
                    name: products[i].name,
                    cost: products.cost,
                });
            }
            res.status(200).send({
                id: cart.id,
                ProductSelected: ProductSelected,
                cost: cost,
            });
        });
    });
};
