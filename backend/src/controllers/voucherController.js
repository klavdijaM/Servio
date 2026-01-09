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