const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
const Employee = new Schema({
  name: {type: String},
  email: {type: String},
  designation: {type: String},
  phoneNumber: {type: String}
}, {
  collection: 'employees', timestamps: true
});
Employee.method('toJSON', args => {
  const {__v, _id, ...object} = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model('Employee', Employee);
