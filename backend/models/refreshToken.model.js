const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RefreshToken = new Schema({
  token: {type: String},
  userId: {type: String},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  expiryDate: {type: Date}
}, {timestamps: true, collection: 'refreshToken'});
module.exports = mongoose.model('RefeshToken', RefreshToken);
