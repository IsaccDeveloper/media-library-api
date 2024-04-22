const mongoose = require('mongoose')

const AccountSchema = mongoose.Schema(
    {
        "username": {
            type: String,
            required: true,
            unique: true,
            minlength: 8,
            maxlength: 24,
            match: /^[a-zA-Z0-9_-]{8,24}$/
        },
        "email": {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        "role": {
            type: String,
            enum: ["admin", "creator", "viewer"],
            required: true,
            default: 'viewer'
        },
        "avatar": {
            type: String,
            default: ""
        },
        "isActive": {
            type: Boolean,
            default: true
        },
        "password": { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const Account = mongoose.model('Account', AccountSchema)

module.exports = Account