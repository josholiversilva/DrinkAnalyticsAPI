const Drink = require('../models/drinks')
const User = require('../models/users')
const sequelize = require('sequelize')

exports.getAll = async (req, res) => {
    try {
        res.send(await User.findAll())
    }
    catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured when finding all Drinks"
        })
    }
}

exports.createNew = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const user = await User.create(req.body);
    console.log(user)
    res.send(user)
}