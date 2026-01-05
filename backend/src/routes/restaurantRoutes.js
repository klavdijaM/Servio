// router = smaller Express application for handling only URLs

const express = require('express');
const router = express.Router();

const { getRestaurants, getRestaurantById} = require('../controllers/restaurantController'); // retrieves the getRestaurant function from the specified file

// GET /restaurants
router.get('/', getRestaurants);

// GET /restaurants/:id
router.get('/:id', getRestaurantById);

module.exports = router;
