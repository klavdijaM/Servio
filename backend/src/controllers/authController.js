const db = require('../database/db');
const bcrypt = require('bcrypt'); // used for hashing passwords
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'servio_jwt_secret';

// POST /auth/register
function register(req, res) {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({error: 'Email and password are required'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expression object

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'Invalid email format'
        });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: 'Password must be at least 6 characters and contain letters and numbers'
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
    `;

    db.run(query, [username, email, hashedPassword], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(409).json({error: 'Username or email already exists'});
            }
            return res.status(500).json({error: 'Failed to register user'});
        }

        res.status(201).json({
            message: 'User registered successfully',
            userId: this.lastID // this => last generated user
        });
    });
}

// POST /auth/login
function login(req, res) {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({error: 'Email and password are required'});
    }

    const query = `
        SELECT id, email, password
        FROM users
        WHERE email = ?
    `;

    db.get(query, [email], (err, user) => {
        if (err) {
            return res.status(500).json({error: 'Database error'});
        }

        if (!user) {
            return res.status(401).json({error: 'Invalid login credentials'});
        }

        const passwordMatches = bcrypt.compareSync(password, user.password);

        if (!passwordMatches) {
            return res.status(401).json({error: 'Invalid login credentials'});
        }

        // token creation
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            JWT_SECRET,
            {expiresIn: '2h'}
        );

        res.json({
            message: 'Login successful',
            token
        });
    });
}

module.exports = {
    register,
    login
};