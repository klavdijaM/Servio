// router = smaller Express application for handling only URLs

const express = require('express');
const router = express.Router();

const { getRestaurants, getRestaurantById} = require('../controllers/restaurantController'); // retrieves the getRestaurant function from the specified file
const { getReviewsByRestaurant } = require('../controllers/reviewController');

// GET /restaurants
router.get('/', getRestaurants);

// GET /restaurants/:id
router.get('/:id', getRestaurantById);

// GET /restaurants/:id/reviews
router.get('/:id/reviews', getReviewsByRestaurant);


module.exports = router;
