const mongoose = require('mongoose')

const ContentTypeSchema = mongoose.Schema(
    {
        "name": {
            type: String,
            required: true
        },
        "type": {
            type: String,
            enum: ["image", "video", "text", "video-youtube"],
            required: true,
            default: 'image'
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

const ContentType = mongoose.model('ContentType', ContentTypeSchema)

module.exports = ContentType