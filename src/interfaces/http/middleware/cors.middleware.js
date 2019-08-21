/* eslint-disable fp/no-unused-expression */
const setOriginMiddleware = ({ express: config }) => (req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    config.corsOrigin,
  );
  return next();
};

const setHeadersMiddleware = ({ express: config }) => (req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Headers',
    config.corsHeaders,
  );
  return next();
};

const setMethodsMiddleware = ({ express: config }) => (req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Methods',
    config.corsMethods,
  );
  return next();
};

const setExposeHeadersMiddleware = ({ express: config }) => (req, res, next) => {
  res.setHeader(
    'Access-Control-Expose-Headers',
    config.corsExposeHeaders,
  );
  return next();
};

module.exports = ({
  config,
}) => () => [
  setOriginMiddleware,
  setHeadersMiddleware,
  setMethodsMiddleware,
  setExposeHeadersMiddleware,
].map((fn) => fn(config));
