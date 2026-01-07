const express = require('express');
const router = express.Router();

const { createReview, getReviewsByRestaurant } = require('../controllers/reviewController');

// POST /reviews
router.post('/', createReview);

module.exports = router;