const express = require('express');
const router = express.Router();

const { getCurrentUser, updatePassword} = require('../controllers/userController');

// GET /users/me
router.get('/me', getCurrentUser);

// PUT /users/password
router.put('/password', updatePassword);

module.exports = router;
