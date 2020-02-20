const getAllHeroes = ({
  heroRepository,
}) => () => heroRepository.getAll();

module.exports = getAllHeroes;
