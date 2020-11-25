const { Router } = require('express');
const curry = require('crocks/helpers/curry');
const pipe = require('crocks/helpers/pipe');
const Status = require('http-status');

const resolveAndSend = curry((res, status, data) => res.status(status).json(data));
const rejectAndNext = curry((next, error) => next(error));

// const errorMap = {
//   ERROR: rejectAndNext,
//   NOT_FOUND: '',
//   VALIDATION_ERROR: '',
// };

const indexRoute = curry((getAllHeros, heroSerializer, req, res, next) => getAllHeros().fork(
  ({ error }) => 'error',
  ({ result }) => pipe(heroSerializer, resolveAndSend(res, Status.OK))(result),
));

const createRoute = curry((createHero, req, res) => createHero().fork(
  ({ error }) => 'error',
  ({ result }) => resolveAndSend(res, Status.OK, result),
));

module.exports = ({
  createHero, getAllHeroes, heroSerializer,
}) => Router()
  .post('/', createRoute(createHero))
  .get('/', indexRoute(getAllHeroes, heroSerializer));
