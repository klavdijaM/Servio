const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { getCurrentUser, updatePassword, updateUsername} = require('../controllers/userController');

// GET /users/me
router.get('/me', authMiddleware, getCurrentUser);

// PUT /users/password
router.put('/password', authMiddleware, updatePassword);

// PUT /users/username
router.put('/username', authMiddleware, updateUsername);

module.exports = router;
