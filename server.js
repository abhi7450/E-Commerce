const express = require("express")
const serverConfig = require("./configs/server.config")
const bodyParser = require("body-parser")

const app = express()

/**
 * Using the body parse middleware
 *
 * Used for parsing the request
 * Parsing the request of the type json and convert that to object
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/***
 * Initialize the database
 */

const db = require("./models")
const { init } = require("express/lib/application")
const category = db.category

db.sequelize.sync({ force: true }).then(() => {
    console.log("table was dropped and created")
    init()
})
function inti() {
    var categoties = [
        {
            name: "Electronics",
            description:
                "This category will contain all the electronic products",
        },
        {
            name: "KitchenItems",
            description: "This category will contain all the kitchen products",
        },
    ]
    category
        .bulkCreate(categoties)
        .then(() => console.log("Category table initialised"))
        .catch((err) => {
            console.log("Error while initialising the category table")
        })
}

require("./routes/category.routes")(app)

app.listen(serverConfig.PORT, () => {
    console.log(`Listning on port ${serverConfig.PORT}`)
})
