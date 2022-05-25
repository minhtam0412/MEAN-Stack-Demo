const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RefreshToken = new Schema({
    token: { type: String },
    userId: { type: String },
    expiryDate: { type: Date }
}, { timestamps: true, collection: 'refreshToken' });
module.exports = mongoose.model('RefeshToken', RefreshToken);