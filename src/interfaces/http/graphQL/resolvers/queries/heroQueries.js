/* eslint-disable */
module.exports = ({
  getAllHeroes,
  getHeroByName,
}) => ({
  allHeroes: async (_, __, context) => {
    // Apollo downcase all headers
    const tenantId = context.req.headers['x-fusionauth-tenantid']
    return getAllHeroes(tenantId).toPromise()
      .then(({ result }) => result)
      .catch(apolloErrorHandler);
  },
  heroByName: async (heroName) => {
    const result = await getHeroByName(heroName).toPromise();
    return result;
  },
});
