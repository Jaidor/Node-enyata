const mongoose = require('mongoose');

const loginTokenSchema = new mongoose.Schema({
    userId: String,
    token: {
        type: String,
        required: true,
    },
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('LoginToken', loginTokenSchema);
