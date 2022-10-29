/**
 * This file contains the controller logic for the category resource.
 * Everytime a CRUD request come for the category, methods that is defined in
 *
 * this controller file will be executed.
 */

const db = require("../models")
const Category = db.category

/**
 * POST: Create and save a new category
 */
exports.create = (req, res) => {
    /**
     * Creation of the category object to be stored in the DB
     */
    const category = {
        name: req.body.name,
        description: req.body.description,
    }
    Category.create(category)
        .then((category) => {
            console.log(
                `category name: [${category.name}] got inserted in the DB.`
            )
            res.status(201).send(category)
        })
        .catch((err) => {
            console.log(`Issue in inserting category name [${category.name}]`)
            console.log(`Error Message:${err.message}`)
            res.status(500).send({
                message: "Some internal error while storing the category",
            })
        })
}

/**
 * GET: Get a list of all the category
 * 1-> GET /ecomm/api/v1/categories (list all the categorys)
 * 2-> GET /ecomm/api/v1/categories?name=Electronics (query)
 */

exports.findAll = (req, res) => {
    let categoryName = req.query.name
    let promise
    if (categoryName) {
        promise = Category.findAll({
            where: {
                name: categoryName,
            },
        })
    } else {
        promise = Category.findAll()
    }
    promise
        .then((categories) => {
            res.status(200).send(categories)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Some internal error while fetching the categories",
            })
        })
}

/**
 * Geting category based on category id
 * e.g  GET /ecomm/api/v1/categories/1
 */

exports.findOne = (req, res) => {
    const categoryId = req.params.id

    Category.findByPk(categoryId)
        .then((category) => {
            if (!category) {
                res.status(404).send({
                    message: "Category can not be found",
                })
            }
            res.status(200).send(category)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Some internal error while fetching the categories",
            })
        })
}
/**
 * Update the existing category
 *  e.g. : PUT /ecomm/api/v1/categories/1
 */

exports.update = (req, res) => {
    const category = {
        name: req.body.name,
        description: req.body.description,
    }
    const categoryId = req.params.id
    Category.update(category, {
        where: {
            id: categoryId,
        },
    })
        .then((updatedcategory) => {
            /**
             * When the updation happens we need to send the row back
             * to the user
             * But while fetching the row and sending it to the user
             * there can be error.
             */
            Category.findByPk(categoryId)
                .then((category) => {
                    res.status(200).send(category)
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            "Some internal error while fetching the category based on id",
                    })
                })
        })
        .catch((err) => {
            // When the updation task is failed.
            res.status(500).send({
                message:
                    "Some internal error while updating the category based on id",
            })
        })
}

/**
 * Deleting an existing category based on category name
 */

exports.delete = (req, res) => {
    const categoryId = req.params.id

    Category.destroy({
        where: {
            id: categoryId,
        },
    })
        .then((result) => {
            res.status(200).send({
                message: "Succcesfully deleted the category",
            })
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    "Some internally error while deleting the category based on id",
            })
        })
}
