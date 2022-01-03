const Restaurant = require('../models/restaurants')

exports.createNew = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const restaurant = await Restaurant.create(req.body);
    console.log(restaurant)
    res.send(restaurant)
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