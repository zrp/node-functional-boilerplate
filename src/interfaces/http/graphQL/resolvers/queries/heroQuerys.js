module.exports = ({
  getAllHeros,
}) => ({
  allHeros: () => getAllHeros().toPromise(),
});
