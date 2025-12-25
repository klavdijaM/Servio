// router = smaller Express application for handling only URLs

const express = require('express');
const router = express.Router();

const { getRestaurants } = require('../controllers/restaurantController'); // retrieves the getRestaurant function from the specified file

router.get('/', getRestaurants);

module.exports = router;
