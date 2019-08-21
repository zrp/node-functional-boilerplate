module.exports = {
  route: process.env.APOLLO_ROUTE,
  introspection: Boolean(process.env.APOLLO_INSTROSPECTION),
  playground: Boolean(process.env.APOLLO_PLAYGROUND),
};
