const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Token needed" });
    }
    try {
        const decoded = jwt.verify(token, 'U5NaWfZFKVvk3aBrAldccif3CFeh5vWJ');
        req.userId = decoded.userId;
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }

    next();
}

module.exports = authMiddleware;