const drinksController = require('../controllers/drinks')
const express = require('express')
const router = express.Router();

// Get All & create new drink
router
    .route("/")
    .get(drinksController.getAll)
    .post(drinksController.createNew)

// Get Top Rated Drink With Time Type
router
    .route('/top/rated/:timeType')
    .get(drinksController.getTopRated)

// Get Most Drinken Drink With Time Type
router
    .route('/top/count/:timeType')
    .get(drinksController.getTopCount)

router
    .route('/cost/:timeType')
    .get(drinksController.getCount)

module.exports = router