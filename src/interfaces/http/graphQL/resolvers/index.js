module.exports = ({
  heroMutations,
  heroQueries,
}) => {
  const Query = { ...heroQueries };
  const Mutation = { ...heroMutations };

  return {
    Query,
    Mutation,
  };
};
