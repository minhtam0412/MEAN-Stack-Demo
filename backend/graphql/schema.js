const productSchema = require('./schemas/product.schema');
const {buildSchema} = require("graphql");


const RootQuery = `
type RootQuery {
  ${productSchema.query}
}
`;

const RootMutation = `
type RootMutation {
  ${productSchema.mutation}
}
`;

const schema = `
schema {
  query: RootQuery,
  mutation: RootMutation
}
`

const schemaBuilder = `
${productSchema.schema}

${RootQuery}
${RootMutation}
${schema}
`;

module.exports = buildSchema(schemaBuilder)
