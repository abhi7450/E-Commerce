/**
 * This file will be used to represent the product Schema
 *
 * Product Fields
 * 1.Id
 * 2.Name
 * 3.Description
 * 4.Cost
 */

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
        },
        cost: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    })
    return Product
}
