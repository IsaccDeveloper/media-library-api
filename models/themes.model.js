const mongoose = require('mongoose')

const ThemeSchema = mongoose.Schema(
    {
        "name": {
            type: String,
            required: true,
            unique: true
        },
        "image": {
            type: String,
            required: true
        },
        "contentTypes": [{ type: mongoose.Types.ObjectId, ref: 'ContentType' }],
        "author": {
            type: mongoose.Types.ObjectId,
            ref: "Account",
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

const Theme = mongoose.model('Theme', ThemeSchema)

module.exports = Theme