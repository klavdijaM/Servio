// router - mini express app which matches URLs to functions

const express = require('express');
const router = express.Router();

const { getCategoriesByRestaurant } = require('../controllers/categoryController');

// GET /restaurants/:restaurantId/categories
router.get('/restaurants/:restaurant_id/categories', getCategoriesByRestaurant); // when a get request matches the URL pattern, call the func

module.exports = router;