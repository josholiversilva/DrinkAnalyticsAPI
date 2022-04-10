const express = require('express')
const cors = require('cors')

var app = express();
var port = process.env.PORT || 3001;

// Route Configuration
app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// Route middlewares
const drinksRouter = require('./routes/drinks')
const restaurantsRouter = require('./routes/restaurants')
const usersRouter = require('./routes/users')

app.use('/drinks', drinksRouter)
app.use('/restaurants', restaurantsRouter)
app.use('/users', usersRouter)

app.listen(port);
console.log('RESTFUL API for drink app on:', port);