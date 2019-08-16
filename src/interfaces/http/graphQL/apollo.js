const { importSchema } = require('graphql-import');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = importSchema(path.join(__dirname, '../../../domain/schemas/schema.graphql'));

const context = ({ req, res }) => ({ headers: req.headers, res });


module.exports = ({
  resolvers,
  logger,
}) => {
  const formatError = require('./errorHandler')(logger);
  return new ApolloServer({
    typeDefs,
    resolvers,
    context,
    formatError,
    introspection: true,
    playground: true,
  });
};
