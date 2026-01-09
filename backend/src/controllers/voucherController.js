const db = require('../database/db');

// GET /vouchers => return all active vouchers
function getActiveVouchers(req, res) {
    const query = `
    SELECT code, discount_type, discount_value
    FROM vouchers
    WHERE is_active = 1`;

    db.all(query, [], (err, vouchers) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(vouchers);
    })
}

// POST /vouchers/validate => checking if a voucher is valid
function validateVoucher(req, res) {
    const {code} = req.body;

    if (!code) {
        return res.status(400).json({valid: false, reason: 'Voucher code is required'});
    }

    const query = `
    SELECT id, code, discount_type, discount_value, is_active
    FROM vouchers
    WHERE code = ?`;

    db.get(query, [code], (err, voucher) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!voucher) {
            return res.json({valid: false, reason: 'Voucher does not exist'});
        }

        if (!voucher.is_active) {
            return res.json({valid: false, reason: 'Voucher is not active'});
        }

        res.json({
            valid: true,
            voucher: {
                code: voucher.code,
                discount_type: voucher.discount_type,
                discount_value: voucher.discount_value
            }
        });
    });
}

module.exports = {
    getActiveVouchers,
    validateVoucher
}