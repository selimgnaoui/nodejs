const express = require('express');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

router.post('/signin', (req, res, next) => {
    User.find({name: req.body.username}).exec().then(user => {
        if (user.length > 1) {
            return res.status(422).json({
                message: "user already exists"

            });
        } else {

            bcrypt.hash(req.body.password, (10), (err, hash) => {
                if (err) {
                    return res.status(409).json({
                        message: "error has been occured"

                    });
                } else {
                    const user = new User({

                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.username,
                        password: hash
                    });
                    user.save();
                }

            }),
                    res.status(200).json({
                message: "user has been used",

            });
        }
    })
});
router.post('/login', (req, res, next) => {
    User.find({name: req.body.username}).exec().then(user => {
        if (user.length < 1)
        {
            return res.status(401).json({
                message: "Authentification failed no useranme"

            })
        } else {
            if (bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result === false)
                {
                    return res.status(401).json({
                        message: "Error" + result

                    })
                } else {
                    const token = jwt.sign({
                        username: user[0].name,
                        id: user[0]._id
                    }, "privatekey",{

                        expiresIn: "1h"
                    });

                    return res.status(200).json({
                        message: "Succeded",
                        token: token
                    })

                }


            }))
                ;



        }
    });



});



module.exports = router;