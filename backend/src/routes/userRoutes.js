const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { getCurrentUser, updatePassword} = require('../controllers/userController');

// GET /users/me
router.get('/me', authMiddleware, getCurrentUser);

// PUT /users/password
router.put('/password', authMiddleware, updatePassword);

module.exports = router;
