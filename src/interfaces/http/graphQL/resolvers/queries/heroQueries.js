module.exports = ({
  getAllHeroes,
  getHeroByName,
}) => ({
  allHeroes: async () => {
    const result = await getAllHeroes().toPromise();
    return result;
  },
  heroByName: async (heroName) => {
    const result = await getHeroByName(heroName).toPromise();
    return result;
  },
});
