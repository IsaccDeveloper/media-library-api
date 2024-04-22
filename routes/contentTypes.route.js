const express = require('express')
const router = express.Router()
const {
    addContentType,
    listContentTypes,
    GetContentTypeDetail
} = require('../controllers/contentTypes.controller')

const apiKeyMiddleware = require('../middlewares/apikey.middleware')

router.post('/', apiKeyMiddleware, addContentType)
router.get('/', apiKeyMiddleware, listContentTypes)
router.get('/:id', apiKeyMiddleware, GetContentTypeDetail)
module.exports = router