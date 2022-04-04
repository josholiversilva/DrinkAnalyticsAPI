const Restaurant = require('../models/restaurants')

exports.createNew = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body)

    const restaurant = await Restaurant.create(req.body);
    console.log(restaurant)
    res.send(restaurant)
}

exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(`[update] name=${req.body['restaurant']}`)
    const restaurantId = await Restaurant.getIdByName(req.body['restaurant'])
    req.body['name'] = req.body['restaurant']
    console.log(`[update] found restaurantid = ${restaurantId}`)

    const updatedRestaurant = await Restaurant.update(
        req.body,
        {returning: true, where: {id: restaurantId}}
    )
    res.send(updatedRestaurant)
}

exports.getAll = async (req, res) => {
    try {
        res.send(await Restaurant.findAll())
    }
    catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured when finding all Drinks"
        })
    }
}

exports.findById = async (req, res) => {
    try {
        res.send(await Restaurant.findByPk(req.params.id))
    }
    catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured when finding Restaurant ID"
        })
    }
}

exports.getTopCount = async (req, res) => {

}

exports.getTopRated = async (req, res) => {
    try {
        res.send(await Restaurant.getTopRated(req.params.timeType))
    }
    catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured when finding top rated Drink"
        })
    }
}