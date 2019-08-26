const Async = require('crocks/Async');

const getAllHeros = ({
  heroRepository,
}) => Async((reject, reseolve) => heroRepository.getAll().fork(reject, reseolve));

module.exports = getAllHeros;
