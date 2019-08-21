const { ApolloServer } = require('apollo-server-express');

module.exports = ({
  config: { apollo: config },
  context,
  resolvers,
  typeDefs,
}) => new ApolloServer({
  context,
  resolvers,
  typeDefs,
  introspection: config.introspection,
  playground: config.playground,
});
