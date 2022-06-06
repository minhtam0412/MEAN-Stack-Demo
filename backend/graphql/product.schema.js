const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Product {
  _id: ID!
  name: String!
  description: String!
  price: Float!
  discount: Int
}

input ProductInputData {
  name: String!
  description: String!
  price: Float!
  discount: Int
}

type RootMutation {
  createProduct(productInput:ProductInputData): Product!
}

type ProductData {
  products: [Product!]!
}

type RootQuery {
  products: ProductData!
}

schema {
  query: RootQuery,
  mutation: RootMutation
}
`);
