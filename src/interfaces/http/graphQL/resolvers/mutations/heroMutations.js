module.exports = ({
  createHero,
  updateHero,
  apolloErrorHandler,
}) => ({
  createHero: (_, hero) => createHero(hero).toPromise()
    .then(({ result }) => result)
    .catch(apolloErrorHandler),
  updateHero: (_, id, hero) => updateHero(id, hero).toPromise()
    .then(({ result }) => result)
    .catch(apolloErrorHandler),
});
