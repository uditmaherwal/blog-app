const { Schema, model } = require('mongoose');
const crypto = require('crypto');

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
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: './public/images/default.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return;
    }

    const salt = crypto.randomBytes(16).toString();
    const hashPassword = crypto.createHmac('SHA256', salt).update(this.password).digest('hex');

    this.salt = salt;
    this.password = hashPassword;

});

const User = model('User', userSchema);

module.exports = {
    User
}