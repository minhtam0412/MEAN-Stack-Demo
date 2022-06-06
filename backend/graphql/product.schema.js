const {buildSchema} = require('graphql');

const typeProduct = `type Product {
  _id: ID!
  name: String!
  description: String!
  price: Float!
  discount: Int
}`;

const typeAll = `

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
`;

module.exports = buildSchema(typeProduct + typeAll);
