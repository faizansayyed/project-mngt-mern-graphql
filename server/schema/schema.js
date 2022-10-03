const {
    GraphQLSchema,
} = require('graphql');
const { RootQuery } = require('../resolvers/query');
const { mutation } = require('../resolvers/mutation');


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});