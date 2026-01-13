// router matches URL + HTTP method

const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { createOrder, getOrderById, getOrdersByUser} = require('../controllers/orderController'); // destructuring of the object: pulls out the two functions

// POST /orders
router.post('/', authMiddleware, createOrder);

// GET /orders/:id
router.get('/:id', authMiddleware, getOrderById);

// GET /orders
router.get('/', authMiddleware, getOrdersByUser);

module.exports = router;