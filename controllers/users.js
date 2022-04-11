const Drink = require('../models/drinks')
const User = require('../models/users')
const sequelize = require('sequelize')
const Restaurant = require('../models/restaurants')

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

exports.getAllUserDrinkData = async (req, res) => {
    try {
        res.send(await Drink.findAllWithUserEmail(req.params.userEmail))
    }
    catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured when finding all Drinks"
        })
    }
}

exports.getAllUserDrinkDataWithinDate = async (req, res) => {
    try {
        res.send(await Drink.findAllUserDataWithDate(req.params.timeType, req.params.range, req.params.userEmail))
    }
    catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured when finding all Drinks"
        })
    }
}

exports.getAllUserRestaurantData = async (req, res) => {
    try {
        res.send(await Restaurant.findAllWithUserEmail(req.params.userEmail))
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