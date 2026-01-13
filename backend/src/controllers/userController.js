const db = require('../database/db');
const bcrypt = require('bcrypt');

// GET /users/me
function getCurrentUser(req, res) {
    const userId = req.user.id;

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

// PUT /users/password
function updatePassword(req, res) {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Missing required data' });
    }

    const query = `
        SELECT id, password
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

        const passwordMatches = bcrypt.compareSync(currentPassword, user.password);

        if (!passwordMatches) {
            return res.status(401).json({ error: 'Current password is not correct' });
        }

        const newHashedPassword = bcrypt.hashSync(newPassword, 10);

        const updateQuery = `
        UPDATE users
        SET password = ?
        WHERE id = ?`

        db.run(updateQuery, [newHashedPassword, userId], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update password' });
            }

            res.json({ message: 'Password updated successfully' });
        })

    })
}

module.exports = {
    getCurrentUser,
    updatePassword
};
