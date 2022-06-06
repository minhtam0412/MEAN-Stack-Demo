const Product = require('../models/product.model');

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
      ...createdProduct._doc, id: createdProduct._id.toString()
    }
  }, products: async function () {
    const products = await Product.find();
    console.log("-> products", products);
    return {
      products: products.map((p) => {
        return {...p._doc, id: p._id.toString()}
      })
    }
  }
}
