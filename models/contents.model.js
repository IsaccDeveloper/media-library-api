const mongoose = require('mongoose')
const Theme = require('./themes.model')
const ContentType = require('./contentTypes.model')

const ContentSchema = mongoose.Schema(
    {
        "title": {
            type: String,
            required: true,
            unique: true
        },
        "author": {
            type: mongoose.Types.ObjectId,
            ref: "Account",
            required: true
        },
        "url": {
            type: String,
            required: true
        },
        "coverImage": {
            type: String,
            default: 'https://www.notta.ai/pictures/translate-youtube-video-cover.png'
        },
        "contentType": {
            type: mongoose.Types.ObjectId,
            ref: "ContentType",
            required: true
        },
        "theme": {
            type: mongoose.Types.ObjectId,
            ref: "Theme",
            required: true
        },
        "isActive": {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)




const Content = mongoose.model('Content', ContentSchema)

module.exports = Content