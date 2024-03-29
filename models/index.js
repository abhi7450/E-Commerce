/**
 * This file will be used for the following purpose:
 * 1.Create the DB  connection with the help of Sequalize
 * 2.Export all the functionalities of the model through this file.
 *
 * One of the biggest advantages of using index.js file is, other file
 * are trying to import this file, just need to provide the module
 * name.
 */

const config = require("../configs/db.config");
const Sequelize = require("sequelize");

/**
 * Creating the DB connection
 *  */
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require("./category.model")(sequelize, Sequelize);
db.product = require("./product.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.cart = require("./cart.model")(sequelize, Sequelize);

/**
 * Establish the relationship between the role and the user
 */

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
});

/**
 * Relationship between cart to products: Many to Many
 */
db.product.belongsToMany(db.cart, {
    through: "cart_products",
    foreignKey: "productId",
});
db.cart.belongsToMany(db.product, {
    through: "cart_products",
    foreignKey: "cartId",
});

/**
 * Relationship between carts and users (many to one)
 */
db.user.hasMany(db.cart);

db.ROLES = ["user", "admin"];

module.exports = db;
