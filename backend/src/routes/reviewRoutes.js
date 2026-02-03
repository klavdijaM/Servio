const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { createReview, getReviewsByRestaurant } = require('../controllers/reviewController');

// POST /reviews (logged-in users only)
router.post('/', authMiddleware, createReview);

// GET /restaurants/:id/reviews (public)
router.get('/restaurants/:id/reviews', getReviewsByRestaurant);

module.exports = router;