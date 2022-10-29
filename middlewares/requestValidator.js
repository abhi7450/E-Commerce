const db = require("../models");
const Category = db.category;

const validateCategoryRequest = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Name of the category can't be empty!!",
        });
    }

    next();
};
const validateProductRequest = (req, res, next) => {
    if (!req.body.name) {
        // if no name is given
        res.status(400).send({
            message: "Name of the product can't be empty!!",
        });
        return;
    }
    if (!req.body.cost) {
        // if product cost is empty
        res.status(400).send({
            message: "Cost can't be kept empty !",
        });
        return;
    }
    /**
     * Check if the category is present or not by its category id as a foreign key
     * -if category id is present
     *      -if category is null
     * -if any server error while fetching the product detail.
     */

    if (req.body.categoryId) {
        Category.findByPk(req.body.categoryId)
            .then((category) => {
                if (!category) {
                    res.status(400).send({
                        message: "Category passed is not available",
                    });
                    return;
                }
                next();
            })
            .catch((err) => {
                res.status(500).send({
                    message: "some internal error while fetching the product detail",
                });
                return;
            });
    } else {
        res.status(400).send({
            message: "Category id was not passed.",
        });
        return;
    }
};
module.exports = {
    validateCategoryRequest: validateCategoryRequest,
    validateProductRequest: validateProductRequest,
};
