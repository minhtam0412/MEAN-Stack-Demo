const Product = require('../models/product.model');
const {isNullOrUndefined} = require("util");

module.exports = {
  createProduct: async function ({productInput}) {
    const product = new Product({
      name: productInput.name,
      description: productInput.description,
      price: productInput.price,
      discount: productInput.discount,
    });

    const createdProduct = await product.save();
    return {
      ...createdProduct._doc, _id: createdProduct._id.toString()
    }
  }, products: async function () {
    const products = await Product.find();
    return {
      products: products.map((p) => {
        return {...p._doc, _id: p._id.toString()}
      })
    }
  }, updateProduct: async function ({id, productInput}) {
    const product = await Product.findById(id);
    if (isNullOrUndefined(product)) {
      throw new Error('Product not found')
    }


    product.name = productInput.name;
    product.description = productInput.description;
    product.price = productInput.price;
    product.discount = productInput.discount;
    product.updated_at = Date.now();

    const updatedProduct = await product.save();
    return {
      ...updatedProduct._doc, _id: updatedProduct._id.toString(),
    }
  }, deleteProduct: async function ({id}) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found!');
    }
    await Product.findByIdAndRemove(id);
    return {
      ...product._doc, _id: product._id.toString()
    }
  }
}
