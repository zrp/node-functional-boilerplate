module.exports = ({
  getAllHeroes,
  getHero,
}) => ({
  allHeroes: async () => {
    const result = await getAllHeroes().toPromise();
    return result;
  },
  getHero: async (heroId) => {
    const result = await getHero(heroId).toPromise();
    return result;
  },
});
