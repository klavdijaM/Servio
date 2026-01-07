const express = require('express');
const router = express.Router();

const { createReview, getReviewsByRestaurant } = require('../controllers/reviewController');

// POST /reviews
router.post('/', createReview);

// GET /restaurants/:id/reviews
router.get('/:id/reviews', getReviewsByRestaurant);

module.exports = router;