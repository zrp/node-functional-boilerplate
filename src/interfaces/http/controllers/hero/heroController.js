const { Router } = require('express');
const curry = require('crocks/helpers/curry');
const Status = require('http-status');
const { resolveAndSend, executeErrorHandler } = require('../../utils');

const indexRoute = curry((getAllHeroes, req, res, next) => getAllHeroes().fork(
  ({ error }) => executeErrorHandler(error, res, next),
  ({ result }) => resolveAndSend(res, Status.OK, result),
));

const createRoute = curry((createHero, req, res, next) => createHero(req.body).fork(
  ({ error }) => executeErrorHandler(error, res, next),
  ({ result }) => resolveAndSend(res, Status.CREATED, result),
));

module.exports = ({
  createHero, getAllHeroes, heroSerializer,
}) => ({
  router: Router()
    .get('/', indexRoute(getAllHeroes, heroSerializer))
    .post('/', createRoute(createHero)),
  indexRoute,
  createRoute,
});
