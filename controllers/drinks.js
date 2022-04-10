const Drink = require('../models/drinks')
const Restaurant = require('../models/restaurants')
const sequelize = require('sequelize');
const User = require('../models/users');

exports.createNew = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const user = await User.findByPk(req.body['userEmail'])
    console.log('user:', user)

    // Special Case: Get Restaurant ID from name & create if non-existent
    for (key in req.body) {
        if (key === 'restaurant' && req.body[key] != null) {
            var restaurantID = await Restaurant.getIdByName(req.body['restaurant'])
            if (restaurantID == null) {
                // var user = await User.create({name: req.body['user']['name'], email: req.body['user']['email'], gender: req.body['user']['gender']})
                // console.log('userEmail:', user.dataValues.email)
                var restaurant = await Restaurant.create({name: req.body['restaurant'], rating: req.body['rating'], userEmail: user.dataValues.email})
                restaurantID = await restaurant.dataValues.id
            }
            req.body['restaurantId'] = restaurantID
            console.log(`Restaurant ${req.body[key]} has id ${restaurantID}`)
        }
    }

    try {
        req.body['restaurantId'] = restaurantID
        res.send(await Drink.create(req.body));
    }
    catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured when creating new Drink"
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        res.send(await Drink.findAll())
    }
    catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured when finding all Drinks"
        })
    }
}

exports.getAllUserData = async (req, res) => {
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

exports.getTopRated = async (req, res) => {
    try {
        res.send(await Drink.getTopRated(req.params.timeType))
    }
    catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured when finding top rated Drink"
        })
    }
}

exports.getAllWithinDate = async (req, res) => {
    try {
        console.log('GET ALL WITHIN DATE:', req.params.range)
        res.send(await Drink.findAllWithDate(req.params.timeType, req.params.range))
    }
    catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured when finding most frequently bought Drink"
        })
    }
}