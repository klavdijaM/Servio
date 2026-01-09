const db = require('../database/db');
const bcrypt = require('bcrypt'); // used for hashing passwords

// POST /auth/register
function register(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `
        INSERT INTO users (email, password)
        VALUES (?, ?)
    `;

    db.run(query, [email, hashedPassword], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(409).json({ error: 'Email already exists' });
            }
            return res.status(500).json({ error: 'Failed to register user' });
        }

        res.status(201).json({
            message: 'User registered successfully',
            userId: this.lastID // this => last generated user
        });
    });
}