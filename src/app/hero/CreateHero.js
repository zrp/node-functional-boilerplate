const Async = require('crocks/Async');
const ifElse = require('crocks/logic/ifElse');
const { isDefined } = require('crocks/predicates');
const pipe = require('crocks/helpers/pipe');
const Maybe = require('crocks/Maybe');
const either = require('crocks/pointfree/either');


const createHero = ({
  heroRepository,
  heroDomain,
}, heroData) => Async((reject, resolve) => {
  const { Just, Nothing } = Maybe;
  const validateHero = (data) => heroDomain.validate(data);

  const ensureValidData = ({ ERROR, OK }) => ifElse(isDefined(ERROR), Nothing, () => Just(OK));

  const forkAddOperation = (data) => heroRepository.add(data).fork(reject, resolve);

  const executeOperation = either(reject, forkAddOperation);

  return pipe(validateHero, ensureValidData, executeOperation, heroData);
});

module.exports = createHero;
