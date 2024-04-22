const Account = require('../models/accounts.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addAccount = async (req, res) => {
    try {
        let user = req.body
        let hashedPassword
        if (user.password) {
            hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword
        }
        const account = await Account.create(user)
        const token = jwt.sign({ userId: account._id }, 'U5NaWfZFKVvk3aBrAldccif3CFeh5vWJ');
        res.status(200).json({ token });
    } catch (error) {
        res.status(200).json({ message: 'Algo salio mal, intentalo mas tarde' })
    }
}

const getAccountDetail = async (req, res) => {
    try {
        const { id } = req.params
        const account = await Account.findById(id)
        res.status(200).json(account)
    } catch (error) {
        res.status(200).json({ message: 'Algo salio mal, intentalo mas tarde' })
    }
}

const login = async (req, res) => {
    try {
        const { password, username } = req.body
        const account = await Account.findOne({ username })
        if (!account) return res.status(401).json({ message: "Username or password are incorrect!" })

        const isPasswordValid = await bcrypt.compare(password, account.password)
        if (!isPasswordValid) return res.status(401).json({ message: "Username or password are incorrect!" })

        const token = jwt.sign({ userId: account._id }, 'U5NaWfZFKVvk3aBrAldccif3CFeh5vWJ')

        res.status(200).json({ token })
    } catch (error) {
        res.status(200).json({ message: 'Algo salio mal, intentalo mas tarde' })
    }
}

const me = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Token needed" });
    }
    try {
        const decoded = jwt.verify(token, 'U5NaWfZFKVvk3aBrAldccif3CFeh5vWJ');
        const account = await Account.findOne({ _id: decoded.userId })
        if (!account) return res.status(401).json({ message: "Account not found" });

        const me = {
            _id: account._id,
            token,
            username: account.username,
            avatar: account.avatar,
            role: account.role

        }
        res.status(200).json(me)
    } catch (error) {
        res.status(200).json({ message: 'Algo salio mal, intentalo mas tarde' })
    }
}

module.exports = {
    addAccount,
    getAccountDetail,
    login,
    me
}