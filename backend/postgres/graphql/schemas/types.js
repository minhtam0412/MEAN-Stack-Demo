const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString} = graphql;

const userType = new GraphQLObjectType({
  name: "User", type: "Query", fields: {
    id: {type: GraphQLString}, name: {type: GraphQLString}, email: {type: GraphQLString}
  }
});


exports.UserType = userType;
