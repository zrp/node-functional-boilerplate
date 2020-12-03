const { Router } = require('express');
const curry = require('crocks/helpers/curry');
const getProp = require('crocks/Maybe/getProp');
const Status = require('http-status');
const { resolveAndSend, executeErrorHandler } = require('../../utils');

const indexRoute = curry((getAllHeroes, req, res, next) => getAllHeroes().fork(
  ({ error }) => executeErrorHandler(error, res, next),
  ({ result }) => resolveAndSend(res, Status.OK, result),
));

const getRoute = curry((getHero, req, res, next) => getHero(getProp('id')(req.params)).fork(
  ({ error }) => executeErrorHandler(error, res, next),
  ({ result }) => resolveAndSend(res, Status.OK, result),
));

const createRoute = curry((createHero, req, res, next) => createHero(req.body).fork(
  ({ error }) => executeErrorHandler(error, res, next),
  ({ result }) => resolveAndSend(res, Status.OK, result),
));

const updateRoute = curry((updateHero, req, res, next) => updateHero(getProp('id')(req.params), req.body).fork(
  ({ error }) => executeErrorHandler(error, res, next),
  ({ result }) => resolveAndSend(res, Status.OK, result),
));

const deleteRoute = curry((deleteHero, req, res, next) => deleteHero(getProp('id')(req.params)).fork(
  ({ error }) => executeErrorHandler(error, res, next),
  ({ result }) => resolveAndSend(res, Status.OK, result),
));

module.exports = ({
  createHero, getAllHeroes, heroSerializer, updateHero, deleteHero,
}) => ({
  router: Router()
    .get('/', indexRoute(getAllHeroes, heroSerializer))
    .post('/', createRoute(createHero, heroSerializer))
    .patch('/', createRoute(updateHero, heroSerializer))
    .delete('/', createRoute(deleteHero, heroSerializer)),
  indexRoute,
  getRoute,
  createRoute,
  updateRoute,
  deleteRoute,
});
