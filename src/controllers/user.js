const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../models/User");

exports.signup = (req, res, next) => {
    if (!req.body.password && !req.body.email && !req.body.admin_password) {
        return res.status(400).json({error: "Missing password, email and admin password"});
    }
    if (!req.body.password) {
        return res.status(400).json({error: "Missing password"});
    }
    if (!req.body.email) {
        return res.status(400).json({error: "Missing email"});
    }
    if (!req.body.admin_password) {
        return res.status(400).json({error: "Missing admin password"});
    }
    if (req.body.password.length < 8) {
        return res.status(400).json({error: "Le mot de passe doit contenir au moins 8 caractères"});
    }
    if (req.body.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null) {
        return res.status(400).json({error: "L'adresse email n'est pas valide"});
    }
    if (req.body.admin_password === process.env.ADMIN_PASSWORD) {
        bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                });
                user
                    .save()
                    .then(() => res.status(201).json({message: "Utilisateur créé !"}))
                    .catch((err) => res.status(400).json({error: err}));
            })
            .catch((err) => res.status(500).json({error: err}));
    } else {
        res
            .status(401)
            .json({message: "Vous n'êtes pas autorisé à créer un utilisateur"});
    }
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if (!user) {
                return res.status(401).json({error: "Utilisateur non trouvé !"});
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({error: "Mot de passe incorrect !"});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({userId: user._id}, process.env.JWT_KEY, {
                            expiresIn: "1h",
                        }),
                    });
                })
                .catch((err) => res.status(500).json({error: err}));
        })
        .catch((err) => res.status(500).json({error: err}));
};

