const express = require('express')
const cors = require('cors')

var app = express();
var port = process.env.PORT || 3001;

app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const drinksRouter = require('./routes/drinks')
const restaurantsRouter = require('./routes/restaurants')
app.use('/drinks', drinksRouter)
app.use('/restaurants', restaurantsRouter)

app.listen(port);
console.log('RESTFUL API for drink app on:', port);