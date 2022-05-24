const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  userName: {type: String, unique: true},
  email: {type: String, required: true},
  address: {type: String},
  password: {type: String, required: true},
  token: {type: String},
  isDeleted: {type: Boolean, default: false}
}, {
  timestamps: true, collection: 'users', toJSON: {
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  }
});

module.exports = mongoose.model('User', User);
