const Product = require("../models/product.model");
const createProduct = ({productInput})
{
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
}
