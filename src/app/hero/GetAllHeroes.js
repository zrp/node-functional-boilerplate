const getAllHeroes = ({
  heroRepository,
}) => (tenantId = 'root') => heroRepository(tenantId).getAll();

module.exports = getAllHeroes;
