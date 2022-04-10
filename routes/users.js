const userController = require('../controllers/users')
const express = require('express')
const router = express.Router();

router
    .route("/")
    .get(userController.getAll)
    .post(userController.createNew)

router
    .route("/:userEmail/drinks")
    .get(userController.getAllUserDrinkData)

router
    .route("/:userEmail/restaurants")
    .get(userController.getAllUserRestaurantData)

module.exports = router