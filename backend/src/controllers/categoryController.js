const db = require('../database/db');

// GET /restaurants/:restaurantId/categories
function getCategoriesByRestaurant(req, res) {
    const restaurantId = req.params.restaurantId;

    const query = `
    SELECT id, name
    FROM categories
    WHERE restaurant_id = ?
    ORDER BY id`;

    db.all(query, [restaurantId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database Error' });
        }
        res.json(rows);
    });
}

module.exports = {
    getCategoriesByRestaurant
}
