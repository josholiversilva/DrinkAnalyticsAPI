const restaurantsController = require('../controllers/restaurants')
const express = require('express')
const router = express.Router();

router
    .route("/")
    .get(restaurantsController.getAll)
    .post(restaurantsController.createNew)
    .put(restaurantsController.update)

router
    .route("/:id")
    .get(restaurantsController.findById)

router
    .route("/top/count/:timeType")
    .get(restaurantsController.getTopCount)

router
    .route('/top/rated/:timeType')
    .get(restaurantsController.getTopRated)

module.exports = router