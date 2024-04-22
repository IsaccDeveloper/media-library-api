function apiKeyMiddleware(req, res, next) {
    const apiKey = req.headers['apikey'];

    if (!apiKey) {
        return res.status(401).json({ message: 'No apikey added' });
    }

    if (apiKey !== 'JyNqrThXb5dvCyJHA3QYfbcpVjKNEtvd') {
        return res.status(403).json({ message: 'invalid Apikey' });
    }

    next();
}

module.exports = apiKeyMiddleware;