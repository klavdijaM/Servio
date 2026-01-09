const express = require('express');
const router = express.Router();

const { getActiveVouchers, validateVoucher } = require('../controllers/voucherController');

// GET /vouchers
router.get('/', getActiveVouchers);

// POST /vouchers/validate
router.post('/validate', validateVoucher);

module.exports = router;