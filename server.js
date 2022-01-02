const express = require('express')
var mysql = require('mysql');

var app = express();
var port = process.env.PORT || 3000;

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
})

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(express.json())

const drinksRouter = require('./api/routes/drinks')
app.use('/drinks', drinksRouter)

app.listen(port);
console.log('RESTFUL API for drink app on:', port);