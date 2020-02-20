module.exports = ({
  getAllHeroes,
}) => ({
  allHeroes: async () => {
    const result = await getAllHeroes().toPromise();
    console.log("​result", result);
    return result;
  },
});
