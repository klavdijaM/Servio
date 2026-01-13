const jwt = require('jsonwebtoken');

const JWT_SECRET = 'servio_jwt_secret';

function authMiddleware(req, res, next) { // 3 params => the func sits between the request and the controller
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Missing Authorization header' });
    }

    const token = authHeader.split(' ')[1]; // extracts the JWT token

    if (!token) {
        return res.status(401).json({ error: 'Missing token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // checks if the token is valid (if user is logged in)
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = authMiddleware;
