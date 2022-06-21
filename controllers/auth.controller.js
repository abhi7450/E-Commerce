const db = require("../models");
const config = require("../configs/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8), // string to hash
    })
        .then((user) => {
            console.log("User created");
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles,
                        },
                    },
                }).then((roles) => {
                    //trying to populate the user role tables.
                    user.setRoles(roles).then(() => {
                        res.status(200).send({ message: "User Registered Successfully !" });
                    });
                });
            } else {
                user.setRoles([1]).then(() => {
                    res.send({ message: "User registered successfully !" });
                });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
        },
    })
        .then((user) => {
            //checking if user is present or not
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            // checking if the password is correct
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invaid Password" });
            }

            //generating token for sigins if user and password validation is passed
            var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 /* 24hrs*/ });
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token,
            });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};
