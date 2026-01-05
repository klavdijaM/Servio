// handles response logic when requests come in
const db = require('../database/db');

// GET /restaurants => returns all restaurants
function getRestaurants(req, res) {

    const query = `
    SELECT id, name, cuisine, delivery_fee, minimum_order_value
    FROM restaurants
    WHERE is_approved = 1
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database Error' });
        }
        res.json(rows);
    })
}

