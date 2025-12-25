const express = require('express');
const router = express.Router();

const { getRestaurants } = require('../controllers/restaurant.controller'); // retrieves the getRestaurant function from the specified file

router.get('/', getRestaurants);
