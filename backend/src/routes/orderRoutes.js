// router matches URL + HTTP method

const express = require('express');
const router = express.Router();

const { createOrder, getOrderById, getOrdersByUser} = require('../controllers/orderController'); // destructuring of the object: pulls out the two functions

// POST /orders
router.post('/', createOrder);

// GET /orders/:id
router.get('/:id', getOrderById);

// GET /orders
router.get('/', getOrdersByUser);

module.exports = router;