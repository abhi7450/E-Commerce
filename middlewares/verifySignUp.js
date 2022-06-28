/**
 * checkDuplicateUsernameOrEmail => check for duplicate email or username
 * checkRolesExisted => check if role exist or not
 */
const { role } = require("../models");
const db = require("../models");

const ROLES = db.ROLES;
const User = db.user;

//check for duplicate email or username
checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username,
        },
    }).then((user) => {
        if (user) {
            res.status(400).send({ message: "Failed!,Username already in use.." });
            return;
        }
    });

    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((user) => {
        if (user) {
            res.status(400).send({ message: "Failed!,Email already in use.." });
            return;
        }
        next();
    });
};

//check if role exist or not
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({ message: "Failed!, Role doesn't exists." });
                return;
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
