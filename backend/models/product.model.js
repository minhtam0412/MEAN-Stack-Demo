const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {type: String},
  description: {type: String},
  price: {type: Number, min: [1]},
  discount: {type: Number},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Product', productSchema);
