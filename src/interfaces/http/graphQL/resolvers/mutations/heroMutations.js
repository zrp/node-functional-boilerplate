module.exports = ({
  createHero,
  updateHero,
  deleteHero,
  apolloErrorHandler,
}) => ({
  createHero: (_, hero) => createHero(hero).toPromise()
    .then(({ result }) => result)
    .catch(apolloErrorHandler),
  updateHero: (_, id, hero) => updateHero(id, hero).toPromise()
    .then(({ result }) => result)
    .catch(apolloErrorHandler),
  deleteHero: (_, id) => deleteHero(id).toPromise()
    .then(({ result }) => result)
    .catch(apolloErrorHandler),
});
