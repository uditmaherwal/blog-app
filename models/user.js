const { Schema } = require('mongoose');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,

    }
}, { timestamps: true });

module.exports = {
    userSchema
}