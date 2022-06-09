const {GraphQLSchema} = require("graphql");
const {queryPostgres} = require("../schemas/queries");
const {mutation} = require("../schemas/mutation");

exports.schemaPostgres = new GraphQLSchema({
  query: queryPostgres, mutation: mutation
});
