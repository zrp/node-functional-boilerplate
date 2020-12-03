module.exports = ({
  createHero,
  apolloErrorHandler,
}) => ({
  createHero: (_, hero) => createHero(hero).toPromise()
    .then(({ result }) => result)
    .catch(apolloErrorHandler),
});
