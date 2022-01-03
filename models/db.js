/*  This is regular mysql style
var env = process.env.NODE_ENV || 'development';
var config = require('../../config')[env]
var mysql = require('mysql');

// Create connection to DB
var conn = mysql.createConnection({
    host: config.development.database.host,
    user: config.development.database.username,
    password: config.development.database.password
})

// Open MySQL connection
conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = conn;
*/

// Sequelize ORM style
const { Sequelize } = require('sequelize');

const database = "boba"
const username = "root"
const password = "password"
const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;