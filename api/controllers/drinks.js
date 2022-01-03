const Drink = require('../models/drinks')
const Restaurant = require('../models/restaurants')
const sequelize = require('sequelize')

exports.createNew = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Get "Must Not Be NULL" keys for Drink Model
    const requiredKeys = new Set();
    requiredKeys.add("name")
    requiredKeys.add("cost")
    requiredKeys.add("restaurant")
    requiredKeys.add("rating")

    // Check if any requiredKeys are null
    for (key in req.body) {
        console.log(key, req.body[key])

        // Get Restaurant ID from name
        if (key === 'restaurant' && req.body[key] !== null) {
            var restaurantID = await Restaurant.getIdByName(req.body['restaurant'])
            req.body['restaurantId'] = restaurantID
            console.log(`Restaurant ${req.body[key]} has id ${restaurantID}`)
            requiredKeys.delete(key)
        }
        else if (requiredKeys.has(key) && req.body[key] !== null) {
            requiredKeys.delete(key)
        }
    }

    // Handle requiredKeys that must not be null
    // & create a new Drink entry if user input all requiredKeys
    if (requiredKeys.size !== 0) {
        console.log(requiredKeys.size)
        res.status(400).send({
            message: `Missing: ${Array.from(requiredKeys).join(',')}`
        });
    }
    else {
        try {
            req.body['restaurantId'] = restaurantID
            const drink = await Drink.create(req.body);
            console.log(drink)
            res.send(drink)
        }
        catch(err) {
            res.status(500).send({
                message:
                    err.message || "Some error occured when creating new Drink"
            })
        }
    }
    // await Drink.create()
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

exports.getTopRated = async (req, res) => {
    try {
        const top = await Drink.getTopRated()
        console.log("controller top rated:", top)
        res.send(await Drink.getTopRated())
    }
    catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured when finding top rated Drink"
        })
    }
}

exports.getTopCount = async (req, res) => {
    try {
        res.send(await Drink.findAll())
    }
    catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured when finding top rated Drink"
        })
    }
}