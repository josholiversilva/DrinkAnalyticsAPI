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
    const missingRequiredKeys = new Set();
    missingRequiredKeys.add("name")
    missingRequiredKeys.add("cost")
    missingRequiredKeys.add("restaurant")
    missingRequiredKeys.add("rating")

    // Check for missingRequiredKeys
    for (key in req.body) {
        // Special Case: Get Restaurant ID from name
        if (key === 'restaurant' && req.body[key] != null) {
            var restaurantID = await Restaurant.getIdByName(req.body['restaurant'])
            if (restaurantID == null)
                continue
            req.body['restaurantId'] = restaurantID
            console.log(`Restaurant ${req.body[key]} has id ${restaurantID}`)
            missingRequiredKeys.delete(key)
        }
        // Existing required key mark
        else if (missingRequiredKeys.has(key) && req.body[key] !== null) {
            missingRequiredKeys.delete(key)
        }
    }

    // Handle missingRequiredKeys: error if still missing otherwise
    // create a new Drink entry if user input all requiredKeys
    if (missingRequiredKeys.size !== 0) {
        res.status(400).send({
            message: `Missing: ${Array.from(missingRequiredKeys).join(',')}`
        });
    }
    else {
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
                err.message || "Some error occured when finding most frequently bought Drink"
        })
    }
}