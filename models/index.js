/**
 * This file will be used for the following purpose:
 * 1.Create the DB  connection with the help of Sequalize
 * 2.Export all the functionalities of the model through this file.
 *
 * One of the biggest advantages of using index.js file is, other file
 * are trying to import this file, just need to provide the module
 * name.
 */

const config = require("../configs/db.config")
const Sequalize = require("sequelize")

/**
 * Creating the DB connection
 *  */
const sequelize = new Sequalize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
})

const db = {}
db.Sequalize = Sequalize
db.sequelize = sequelize
db.category = require("./category.model")(sequelize, Sequalize)

module.exports = db
