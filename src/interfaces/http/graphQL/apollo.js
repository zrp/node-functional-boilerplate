const { ApolloServer } = require('apollo-server-express');

module.exports = ({
  context,
  resolvers,
  typeDefs,
}) => new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
