const express = require('express')
const router = express.Router()
const {
    addAccount,
    getAccountDetail,
    login,
    me
} = require('../controllers/accounts.controller')

const apiKeyMiddleware = require('../middlewares/apikey.middleware')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', apiKeyMiddleware, addAccount)
router.get('/:id', apiKeyMiddleware, getAccountDetail)
router.post('/login', apiKeyMiddleware, login)
router.get('/auth/me', apiKeyMiddleware, authMiddleware, me)
module.exports = router