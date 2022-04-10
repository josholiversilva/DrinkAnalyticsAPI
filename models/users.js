const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = require('./db')
const drinkModel = require('./drinks')
const restaurantModel = require('./restaurants')
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('users', {
    email: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATE
    },
    gender: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

User.hasMany(drinkModel)
User.hasMany(restaurantModel)

// Custom Queries
module.exports = User;