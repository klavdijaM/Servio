// handles response logic when requests come in
const db = require('../database/db');

// GET /restaurants => returns all restaurants
function getRestaurants(req, res) {

    const query = `
    SELECT id, name, cuisine, delivery_fee, minimum_order_value
    FROM restaurants
    WHERE is_approved = 1`;

    db.all(query, [], (err, rows) => { // returns array of objects
        if (err) {
            return res.status(500).json({ error: 'Database Error' });
        }
        res.json(rows);
    })
}

// GET /restaurants/:id => returns a single restaurant by its id
function getRestaurantById(req, res) {
    const restaurantId = req.params.id; // path params

    const query = `
    SELECT id, name, cuisine, delivery_fee, minimum_order_value
    FROM restaurants
    WHERE id = ? AND is_approved = 1`;

    db.get(query, [restaurantId], (err, row) => { // returns one obj (one row)
        if (err) {
            return res.status(500).json({ error: 'Database Error' });
        }
        if (!row) {
            return res.status(404).json({error: 'Restaurant not found'});
        }
        res.json(row);
    });

}

module.exports = {
    getRestaurants,
    getRestaurantById,
}

