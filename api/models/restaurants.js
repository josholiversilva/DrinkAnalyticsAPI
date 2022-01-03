const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = require('./db')
const drinkModel = require('./drinks')

const Restaurant = sequelize.define('restaurants', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    pic: {
        type: Sequelize.STRING, 
        defaultValue: "default"
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
}, {
    timestamps: false
})

Restaurant.hasMany(drinkModel)

// Custom Queries
Restaurant.getIdByName = async (name) => {
    const res = await sequelize
        .query(
            `SELECT id FROM restaurants WHERE name="${name}" LIMIT 1`,
            { type: Sequelize.QueryTypes.SELECT }
        )
    if (res.length > 0) {
        console.log("In findByName: ", res[0].id)
        return res[0].id
    }

    console.log("Could not find any restaurant with id: create new restaurant & get pic via yelp api")
    return null
}

module.exports = Restaurant;