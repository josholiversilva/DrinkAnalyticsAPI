const { Sequelize } = require('sequelize');
const sequelize = require('./db')

const Drink = sequelize.define('drink', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    cost: {
        type: Sequelize.FLOAT, 
        allowNull: false
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    restaurantId: {
        type: Sequelize.INTEGER,
        references: 'restaurants',
        referencesKey: 'id'
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    state: {
        type: Sequelize.STRING,
        defaultValue: "CA"
    },
    city: Sequelize.STRING,
    description: Sequelize.STRING
}, {
    timestamps: false
})

Drink.getTopRated = async (date) => {
    const top = await sequelize
        .query(
            "SELECT * FROM drinks WHERE MONTH(date)=MONTH(CURRENT_DATE) ORDER BY rating DESC LIMIT 1",
            { type: Sequelize.QueryTypes.SELECT }
        )
    console.log("Top Rated: ", top)
    return top
}

module.exports = Drink;