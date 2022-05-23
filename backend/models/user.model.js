const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
  userName: {type: String, unique: true},
  email: {type: String},
  address: {type: String},
  isDeleted: {type: Boolean, default: false}
}, {timestamps: true, collection: 'users'});

module.exports = mongoose.model('User', User);
