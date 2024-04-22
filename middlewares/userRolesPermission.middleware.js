const jwt = require('jsonwebtoken');
const Account = require('../models/accounts.model')

const adminPermission = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Token needed" });
    }
    try {
        const decoded = jwt.verify(token, 'U5NaWfZFKVvk3aBrAldccif3CFeh5vWJ');
        const account = await Account.findOne({ _id: decoded.userId })
        if (!account) return res.status(401).json({ message: "You don't have permission to do this action" });
        if (account.role !== 'admin') return res.status(401).json({ message: "You don't have permission to do this action" });
        next();
    } catch (error) {
        return res.status(401).json({ message: error });
    }
}

module.exports = {
    adminPermission
}