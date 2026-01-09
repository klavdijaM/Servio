const db = require('../database/db');

// GET /users/me
function getCurrentUser(req, res) {
    const userId = req.query.userId; //GET /users/me?userId=5

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const query = `
        SELECT id, email, delivery_zone_id
        FROM users
        WHERE id = ?
    `;

    db.get(query, [userId], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    });
}

module.exports = {
    getCurrentUser
};
