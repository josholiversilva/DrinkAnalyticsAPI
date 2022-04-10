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
        referencesKey: 'id',
        allowNull: false
    },
    userEmail: {
        type: Sequelize.STRING,
        references: 'users',
        referencesKey: 'email',
        allowNull: false
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

Drink.getTopRated = async (timeType) => {
    if (timeType == 'month') {
        const top = await sequelize
            .query(
                `SELECT * 
                FROM drinks 
                WHERE MONTH(date)=MONTH(CURRENT_DATE) 
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
                FROM drinks 
                WHERE YEAR(date)=YEAR(CURRENT_DATE) 
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
                FROM drinks
                WHERE date >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY
                AND date < curdate() - INTERVAL DAYOFWEEK(curdate())-6 DAY;
                ORDER BY rating DESC
                LIMIT 1
                `,
                { type: Sequelize.QueryTypes.SELECT }
            )
        console.log("Top Rated: ", top)
        return top
    }
}

Drink.findAllWithUserEmail = async (userEmail) => {
    const res = await sequelize.query(`SELECT * from drinks WHERE userEmail='${userEmail}'`, { type: Sequelize.QueryTypes.SELECT })
    return res
}

Drink.findAllWithDate = async (timeType, range) => {
    var top = {}
    if (timeType == 'y') {
        top = await sequelize
            .query(
                `SELECT * FROM drinks WHERE YEAR(date)=${range}`,
                { type: Sequelize.QueryTypes.SELECT }
            )
    }
    else if (timeType == 'm') {
        top = await sequelize
            .query(
                `SELECT * FROM drinks WHERE MONTH(date)=${range}`,
                { type: Sequelize.QueryTypes.SELECT }
            )
    }
    else {
        // Should be in format of YYYY-MM-DD
        const [prev,nxt] = range.split('and')
        top = await sequelize
            .query(
                `SELECT *
                FROM drinks
                WHERE date 
                BETWEEN "${prev}" AND "${nxt}"
                `,
                { type: Sequelize.QueryTypes.SELECT }
            )
    }
    console.log("Top Rated: ", top)
    return top
}

module.exports = Drink;