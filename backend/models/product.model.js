const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {type: String}, description: {type: String}, price: {type: Number, min: [1]}, discount: {type: Number, min: 1}
});
module.exports = mongoose.model('Product', productSchema);
