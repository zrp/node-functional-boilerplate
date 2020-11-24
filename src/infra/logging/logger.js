const IO = require('crocks/IO');
const getProp = require('crocks/Maybe/getProp');
const maybeToArray = require('crocks/Maybe/maybeToArray');
const chain = require('crocks/pointfree/chain');
const objOf = require('crocks/helpers/objOf');
const { isDevelopment } = require('src/utils');
const bichain = require('crocks/pointfree/bichain');
const { Just } = require('crocks/Maybe');

const {
  createLogger,
  format,
  transports,
} = require('winston');

const {
  combine,
  timestamp,
  label,
  printf,
  json,
  colorize,
} = format;

const productionFormatter = ({ labelValue }) => combine(
  label({
    label: labelValue,
  }),
  timestamp(),
  json(),
);

const productionLogger = ({
  appIdentifier,
}) => createLogger({
  format: productionFormatter({ labelValue: appIdentifier }),
  transports: [
    new transports.Console(),
  ],
});

app      |     at raiseError (/home/node/app/node_modules/env-var/lib/variable.js:47:11)
const createPrefixInfo = (info) => getProp('timestamp')(info)
  .map((t) => `${t} [`)
  .concat(getProp('label')(info))
  .chain((message) => Just(`${message}] `))
  .concat(getProp('level')(info));

const getErrorMessage = (i) => getProp('message')(i)
  .map(JSON.stringify);
const getErrorStack = getProp('stack');

const formatMessageWithPrefix = (i) => createPrefixInfo(i)
  .map((prefix) => `${prefix}: `)
  .concat(getErrorMessage(i));

const formatStack = (messageWithPrefix) => bichain(
  () => messageWithPrefix,
  (stack) => messageWithPrefix
    .map((message) => `${message}\nSTACK: `)
    .concat(Just(stack)),
);

const printDevMessage = (info) => {
  const prefix = formatMessageWithPrefix(info);
  const formatStackWithPrefix = formatStack(prefix);
  const errorStack = getErrorStack(info);
  return formatStackWithPrefix(errorStack);
};

const developmentFormatter = ({ labelValue }) => combine(
  timestamp(),
  colorize(),
  label({
    label: labelValue,
  }),
  printf((i) => {
    const [msg] = maybeToArray(printDevMessage(i));
    return msg;
  }),
);

const developmentLogger = ({ appIdentifier }) => createLogger({
  format: developmentFormatter({ labelValue: appIdentifier }),
  transports: [
    new transports.Console(),
  ],
});

const getSafeEnvs = (config) => {
  const env = getProp('nodeEnv')(config);
  const appIdentifier = getProp('appIdentifier')(config)
    .map(objOf('appIdentifier'));

  const flatten = chain(maybeToArray);
  const [prodEnvs] = flatten([appIdentifier]);
  const [devEnvs] = flatten([appIdentifier]);
  return {
    env,
    prodEnvs,
    devEnvs,
  };
};

const getLogger = ({
  config,
}) => {
  const { devEnvs, prodEnvs, env } = getSafeEnvs(config);

  const logger = isDevelopment(env)
    ? developmentLogger(devEnvs)
    : productionLogger(prodEnvs);
  return {
    error: (message, err) => IO(() => logger.error(message, err)),
    info: (message, err) => IO(() => logger.info(message, err)),
    warn: (message, err) => IO(() => logger.warn(message, err)),
    debug: (message, err) => IO(() => logger.debug(message, err)),
  };
};

module.exports = {
  getLogger,
  printDevMessage,
};
