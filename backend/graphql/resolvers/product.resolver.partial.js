const Product = require("../../models/product.model");
const getAllProduct = async () => {
  const products = await Product.find();
  return {
    products: products.map((p) => {
      return {...p._doc, _id: p._id.toString()}
    })
  }
}

const product = async ({id}) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found!');
  }
  return {
    ...product._doc, _id: product._id.toString()
  }
}
module.exports = {getAllProduct, product}
