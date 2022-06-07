const schema = `
type Product {
  _id: ID!
  name: String!
  description: String!
  price: Float!
  discount: Int,
  created_at: String
  updated_at: String
}

input ProductInputData {
  name: String!
  description: String!
  price: Float!
  discount: Int
}

type ProductData {
  products: [Product!]!
}
`;

const query = `
  products: ProductData!
`;

const mutation = `
  createProduct(productInput: ProductInputData): Product!
  updateProduct(id: ID!, productInput: ProductInputData): Product!
  deleteProduct(id: ID!): Product!
`;

module.exports = {schema, query, mutation}
