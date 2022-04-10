const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = require('./db')
const drinkModel = require('./drinks')

const Restaurant = sequelize.define('restaurants', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    rating: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    userEmail: {
        type: Sequelize.STRING,
        references: 'users',
        referencesKey: 'email',
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
        return res[0].id
    }
    return null
}

Restaurant.getTopRated = async (timeType) => {
    if (timeType == 'month') {
        const top = await sequelize
            .query(
                `SELECT * 
                FROM restaurants 
                WHERE MONTH(updated)=MONTH(CURRENT_DATE) 
                ORDER BY rating DESC 
                LIMIT 1`,
                { type: Sequelize.QueryTypes.SELECT }
            )
        return top
    }
    else if (timeType == 'year') {
        const top = await sequelize
            .query(
                `SELECT * 
                FROM restaurants 
                WHERE YEAR(updated)=YEAR(CURRENT_DATE) 
                ORDER BY rating DESC 
                LIMIT 1`,
                { type: Sequelize.QueryTypes.SELECT }
            )
        console.log("Top Rated: ", top)
        return top
    }
    else {
        const top = await sequelize
            .query(
                `SELECT *
                FROM restaurants 
                WHERE updated between (SELECT DATE_SUB(updated, INTERVAL 1 WEEK)) 
                AND 
                (SELECT DATE_ADD(updated, INTERVAL 1 WEEK))
                ORDER BY rating DESC
                LIMIT 1
                `,
                { type: Sequelize.QueryTypes.SELECT }
            )
        console.log("Top Rated: ", top)
        return top
    }
}

module.exports = Restaurant;