const Product = require("../../models/product.model");
const products = async () => {
  const products = await Product.find();
  return {
    products: products.map((p) => {
      return {...p._doc, _id: p._id.toString()}
    })
  }
}
module.exports = {products}
