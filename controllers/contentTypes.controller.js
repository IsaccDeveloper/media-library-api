const ContentType = require('../models/contentTypes.model')

const addContentType = async (req, res) => {
    try {
        const contentType = await ContentType.create(req.body)
        res.status(200).json(contentType)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const listContentTypes = async (req, res) => {
    try {
        const contentTypes = await ContentType.find()
        res.status(200).json(contentTypes)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const GetContentTypeDetail = async (req, res) => {
    try {
        const { id } = req.params
        const contentType = await ContentType.findById(id)
        res.status(200).json(contentType)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    addContentType,
    listContentTypes,
    GetContentTypeDetail
}