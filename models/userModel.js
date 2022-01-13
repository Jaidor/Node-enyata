const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    password: String,
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('User', userSchema);
