module.exports = ({
  createHero,
}) => ({
  createHero: (_, hero) => createHero(hero).toPromise(),
});
