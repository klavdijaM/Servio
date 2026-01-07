const db = require('../database/db');

// POST /orders => inserting orders into the database
function createOrder(req, res) {
    const {userId, restaurantId, items, voucherId} = req.body;

    if (!userId || !restaurantId || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({error: 'Invalid order data'});
    }

    db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        const insertOrderQuery = `
            INSERT INTO orders (user_id, restaurant_id, status, voucher_id)
            VALUES (?, ?, ?, ?)`;

        db.run(
            insertOrderQuery,
            [userId, restaurantId, 'created', voucherId ?? null],
            function (err) {
                if (err) {
                    db.run('ROLLBACK');
                    return res.status(500).json({error: 'Failed to create order'});
                }
                const orderId = this.lastID; // the order we created (id is auto-generated)

                const insertItemQuery = `
                    INSERT INTO order_items (order_id, dish_id, quantity, price)
                    VALUES (?, ?, ?, ?)`;

                let completed = 0;
                let failed = false;

                items.forEach(item => {
                    db.run(
                        insertItemQuery,
                        [orderId, item.dishId, item.quantity, item.price],
                        (err) => {
                            if (err && !failed) {
                                failed = true;
                                db.run('ROLLBACK');
                                return res.status(500).json({error: 'Failed to create order items'});
                            }

                            completed++; // counts successful increments

                            if (completed === items.length && !failed) {
                                db.run('COMMIT', (commitErr) => {
                                    if (commitErr) {
                                        db.run('ROLLBACK');
                                        return res.status(500).json({error: 'Failed to finalize order'});
                                    }

                                    res.status(201).json({message: 'Order created', orderId});
                                });
                            }
                        }
                    );
                });
            }
        );
    });
}

// GET /orders/:id => returns an order with its items
function getOrderById(req, res) {
    const orderId = req.params.id;

    const orderQuery = `
        SELECT *
        FROM orders
        WHERE id = ?`;

    const itemsQuery = `
        SELECT dish_id, quantity, price
        FROM order_items
        WHERE order_id = ?`;

    db.get(orderQuery, [orderId], (err, order) => {
            if (err) {
                return res.status(500).json({error: 'Database error'});
            }
            if (!order) {
                return res.status(404).json({error: 'Order not found'});
            }

            db.all(itemsQuery, [orderId], (err, items) => {
                if (err) {
                    return res.status(500).json({error: 'Database error'});
                }

                res.json({order, items});
            });
        }
    );
}

// GET /orders => returns all orders for a user
function getOrdersByUser(req, res) {
    const userId = req.query.userId; //GET /orders?userId=5

    if(!userId) {
        return res.status(400).json({error: 'User ID is required'});
    }

    const query = `
    SELECT o.id, o.restaurant_id, o.status, o.created_at, COUNT(oi.id) AS total_items
    FROM orders o
    LEFT JOIN order_items oi ON oi.order_id = o.id
    WHERE o.user_id = ?
    GROUP BY o.id -- collapses all rows with the same order id into one row
    ORDER BY o.created_at DESC`;

    db.all(query, [userId], (err,orders) => {
        if (err) {
            return res.status(500).json({error: 'Database error'});
        }
        res.json(orders);
    })

}

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUser,
};