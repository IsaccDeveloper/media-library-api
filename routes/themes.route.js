const express = require('express')
const router = express.Router()
const {
    addTheme,
    listThemes,
    GetThemeDetail,
    updateTheme
} = require('../controllers/themes.controller')

const apiKeyMiddleware = require('../middlewares/apikey.middleware')
const {
    adminPermission
} = require('../middlewares/userRolesPermission.middleware')


router.post('/', apiKeyMiddleware, adminPermission, addTheme)
router.get('/', apiKeyMiddleware, listThemes)
router.get('/:id', apiKeyMiddleware, GetThemeDetail)
router.put('/:id', apiKeyMiddleware, updateTheme)
module.exports = router