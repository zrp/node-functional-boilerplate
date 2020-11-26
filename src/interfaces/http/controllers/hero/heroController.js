const { Router } = require('express');
const curry = require('crocks/helpers/curry');
const Status = require('http-status');
const getPropOr = require('crocks/helpers/getPropOr');

const resolveAndSend = curry((res, status, data) => res.status(status).json(data));
const rejectAndNext = curry((next, error) => next(error));

const errors = {
  NOT_FOUND: '',
  VALIDATION_ERROR: '',
};

const errorMap = ({ type }) => {
  const getErrorHandler = getPropOr(rejectAndNext);
  return getErrorHandler(type, errors);
};

// const defaultRejectMethod = curry((next, res, error) => errorMap(error)(next));
// const defaultResolvedMethod = curry((res, serializer, result));


const createControllerFactory = curry((req, res, next));

const createHero = (getAllHeroes, heroSerializer) =>
  getAllHeroes()
  .toPromise()
  .then(({result }) => {
    const serializedData = result.map(heroSerializer);
    const resolveAndSendOk = resolveAndSend(res, Status.OK);
    return resolveAndSendOk(serializedData);
  })
  .catch();


.fork(
  
  ({) => {
   
  },
));

const createRoute = curry((createHero, req, res) => createHero().fork(
  ({ error }) => 'error',
  ({ result }) => resolveAndSend(res, Status.OK, result),
));

module.exports = ({
  createHero, getAllHeroes, heroSerializer,
}) => ({
  heroController: Router()
    .post('/', createRoute(createHero))
    .get('/', indexRoute(getAllHeroes, heroSerializer)),
  indexRoute,
  createRoute,
});
