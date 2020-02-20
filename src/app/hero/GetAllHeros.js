const Async = require('crocks/Async');

const getAllHeros = ({
  heroRepository,
}) => Async((reject, resolve) => heroRepository.getAll().fork(reject, resolve));

module.exports = getAllHeros;
