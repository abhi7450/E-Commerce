/***
 * This file will be used to represent the category schema
 *
 * Category fields:
 * 1.id
 * 2.name
 * 3.description
 */

module.exports = (sequelize, Sequalize) => {
    const Category = sequelize.define("category", {
        id: {
            type: Sequalize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequalize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequalize.STRING,
        },
    })
    return Category
}
