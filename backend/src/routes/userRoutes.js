const express = require('express');
const router = express.Router();

const { getCurrentUser } = require('../controllers/userController');

// GET /users/me
router.get('/me', getCurrentUser);

module.exports = router;
