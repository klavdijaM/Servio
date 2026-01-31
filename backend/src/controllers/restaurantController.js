// handles response logic when requests come in
const db = require('../database/db');

// GET /restaurants => returns all restaurants
function getRestaurants(req, res) {

    const query = `
        SELECT r.id,
               r.name,
               r.cuisine,
               r.delivery_fee,
               r.minimum_order_value,
               dz.base_delivery_time AS delivery_time,
               ROUND(AVG(rv.rating), 1) AS rating,
               COUNT(rv.id) AS rating_count
        FROM restaurants r
        JOIN delivery_zones dz
            ON r.delivery_zone_id = dz.id
        LEFT JOIN reviews rv
            ON rv.restaurant_id = r.id
        WHERE r.is_approved = 1
        GROUP BY r.id
    `;

    db.all(query, [], (err, rows) => { // returns array of objects
        if (err) {
            return res.status(500).json({error: 'Database Error'});
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
        WHERE id = ?
          AND is_approved = 1`;

    db.get(query, [restaurantId], (err, row) => { // returns one obj (one row)
        if (err) {
            return res.status(500).json({error: 'Database Error'});
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

