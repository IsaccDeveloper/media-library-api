const express = require('express')
const router = express.Router()
const {
    addContent,
    listContents
} = require('../controllers/contents.controller')
const apiKeyMiddleware = require('../middlewares/apikey.middleware')


router.post('/', apiKeyMiddleware, addContent)
router.get('/', apiKeyMiddleware, listContents)
module.exports = router