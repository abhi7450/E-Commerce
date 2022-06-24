const express = require("express");
const serverConfig = require("./configs/server.config");
const bodyParser = require("body-parser");

const app = express();

/**
 * Using the body parse middleware
 *
 * Used for parsing the request
 * Parsing the request of the type json and convert that to object
 */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/***
 * Initialize the database
 */

const db = require("./models");
const category = db.category;
const product = db.product;
const role = db.role;

category.hasMany(product); // THis will create a foreign key column(categoryId) in product table.

db.sequelize.sync({ force: true }).then(() => {
    console.log("table was dropped and created");
    init();
});

function init() {
    var categoties = [
        {
            name: "Electronics",
            description: "This category will contain all the electronic products",
        },
        {
            name: "KitchenItems",
            description: "This category will contain all the kitchen products",
        },
    ];
    var products = [
        {
            name: "Nike Shoe",
            description: "Brand new nike shoe",
            cost: "10000",
            categoryId: "1",
        },
        {
            name: "Cutlery",
            description: "8 Cutlery Items",
            cost: "2500",
            categoryId: "1",
        },
    ];
    category
        .bulkCreate(categoties)
        .then(() => console.log("Category table initialised"))
        .catch((err) => {
            console.log("Error while initialising the category table");
        });
    product
        .bulkCreate(products)
        .then(() => console.log("Product table initialised"))
        .catch((err) => console.log("Error while initialising the product table"));

    /**
     * Adding Roles
     */
    role.create({
        id: 1,
        name: "user",
    }).then((role) => {
        console.log("Role Created");
    });
    role.create({
        id: 2,
        name: "admin",
    });
}

require("./routes/category.routes")(app);
require("./routes/product.routes")(app);
require("./routes/auth.routes")(app);

app.listen(serverConfig.PORT, () => {
    console.log(`Listning on port ${serverConfig.PORT}`);
});
