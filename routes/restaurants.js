const restaurantsController = require('../controllers/restaurants')
const express = require('express')
const router = express.Router();

router
    .route("/")
    .get((req, res) => {
        res.send('Hello World')
    })
    .post(restaurantsController.createNew)

router
    .route("/:id")
    .get(restaurantsController.findById)

router
    .route("/top/count/:timeType")
    .get(restaurantsController.getTopCount)

module.exports = router