module.exports = ({
  getAllHeroes,
}) => ({
  allHeroes: async () => {
    const result = await getAllHeroes().toPromise();
    return result;
  },
});
