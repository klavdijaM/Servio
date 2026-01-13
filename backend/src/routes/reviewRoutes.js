const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { createReview, getReviewsByRestaurant } = require('../controllers/reviewController');

// POST /reviews
router.post('/', authMiddleware, createReview);

module.exports = router;