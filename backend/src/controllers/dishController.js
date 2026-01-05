const db = require('../database/db');

// GET /restaurants/:restaurantId/categories/:categoryId/dishes
function getDishesByCategory(req, res) {
    const categoryId = req.params.categoryId;

    const query = `
    SELECT id, name, description, price
    FROM dishes
    WHERE categoryId = ?
    ORDER BY id`;

    db.all(query, [categoryId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database Error' });
        }
        res.json(rows);
    });
}

module.exports = {
    getDishesByCategory
}