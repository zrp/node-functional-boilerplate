module.exports = ({
  createHero,
  updateHero,
  deleteHero,
  apolloErrorHandler,
}) => ({
  createHero: (_, hero, context) => {
    // Apollo downcase all headers
    const tenantId = context.req.headers['x-fusionauth-tenantid'];

    return createHero(tenantId, hero).toPromise()
      .then(({ result }) => result)
      .catch(apolloErrorHandler);
  },
  updateHero: (_, id, hero) => updateHero(id, hero).toPromise()
    .then(({ result }) => result)
    .catch(apolloErrorHandler),
  deleteHero: (_, heroName) => deleteHero(heroName).toPromise()
    .then(({ result }) => result)
    .catch(apolloErrorHandler),
});
