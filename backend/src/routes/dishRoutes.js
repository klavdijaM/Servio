const express = require("express");
const router = express.Router();

const { getDishesByCategory } = require("../controllers/dishController");

// GET /restaurants/:restaurantId/categories/:categoryId/dishes
router.get('/:restaurantId/categories/:categoryId/dishes', getDishesByCategory);

module.exports = router;