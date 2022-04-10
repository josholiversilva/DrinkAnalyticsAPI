const userController = require('../controllers/users')
const express = require('express')
const router = express.Router();

router
    .route("/")
    .get(userController.getAll)
    .post(userController.createNew)

module.exports = router