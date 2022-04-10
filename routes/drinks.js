const drinksController = require('../controllers/drinks')
const express = require('express')
const router = express.Router();

// Get All & create new drink
router
    .route("/")
    .get(drinksController.getAll)
    .post(drinksController.createNew)

// Get All Drinks in a give time
router
    .route("/:timeType/:range")
    .get(drinksController.getAllWithinDate)

// Get Top Rated Drink With Time Type
router
    .route('/top/rated/:timeType')
    .get(drinksController.getTopRated)

// Get All Drinks for a user
// router
    // .route("/:userEmail")
    // .get(drinksController.getAllUserData)

// Get All Drinks for a user with time type
// router
    // .route("/:userEmail/:timeType/:range")
    // .get(drinksController.getUserDataWithinDate)

// Get Most Drinken Drink With Time Type
/*
router
    .route('/top/count/:timeType')
    .get(drinksController.getTopCount)

router
    .route('/cost/:timeType')
    .get(drinksController.getCount)
*/

module.exports = router