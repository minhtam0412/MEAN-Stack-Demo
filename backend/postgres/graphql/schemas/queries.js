const {db} = require('../pgAdaptor');
const {UserType} = require('../schemas/types');
const {GraphQLObjectType, GraphQLID} = require("graphql");


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType", type: "Query", fields: {
    user: {
      type: UserType, args: {id: {type: GraphQLID}}, resolve(parentValue, args) {
        const sql = `SELECT *
                     FROM users
                     where id = $1`;
        const values = [args.id];

        return db.one(sql, values).then(value => {
          return value;
        }).catch(reason => {
          console.log("-> reason", reason);
        });
      }
    }
  }
});
exports.queryPostgres = RootQuery;
