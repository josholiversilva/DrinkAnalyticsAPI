const express = require('express')
const router = express.Router();

// Get All
router.get('/', (req, res) => {
    res.send('Hello World')
})

// Get Fave Drink With Time Type
router.get('/favorite/:timeType', (req, res) => {
    res.send(req.params)
})

// Get One
router.get('/:id', (req, res) => {
    res.send(req.params)
})

// Create One
router.post('/', (req, res) => {
})

// Update One
router.patch('/:id', (req, res) => {
    
})

// Delete One
router.delete('/:id', (req, res) => {
    
})

module.exports = router