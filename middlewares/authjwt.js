const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const db = require("../models");

const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]; //get access passed by the user

    if (!token) {
        // if no token passed by user
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorised" });
        }
        req.userId = decoded.id;
        next();
    });
};

//Check weather the user who hit the admin or not
isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name == "admin") {
                    next();
                    return;
                }
            }
            res.send(403).send({
                message: "Require admin role",
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};

module.exports = authJwt;
