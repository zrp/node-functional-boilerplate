const IO = require('crocks/IO');
const getProp = require('crocks/Maybe/getProp');
const isObject = require('crocks/predicates/isObject');
const safe = require('crocks/Maybe/safe');
const composeK = require('crocks/helpers/composeK');
const maybeToArray = require('crocks/Maybe/maybeToArray');
const chain = require('crocks/pointfree/chain');
const objOf = require('crocks/helpers/objOf');

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

const productionFormatter = (machineHost) => combine(
  label({
    label: machineHost,
  }),
  timestamp(),
  json(),
);

const productionLogger = ({
  machineHost,
  slackWebHookChannel,
  slackWebHookUrl,
}) => createLogger({
  format: productionFormatter(machineHost),
  transports: [
    new transports.Console(),
    new transports.Slack({
      level: 'warn',
      channel: slackWebHookChannel,
      webhook_url: slackWebHookUrl,
      custom_formatter: (level, message, meta) => ({
        text: `*${process.env.npm_package_name}*\n`
          + `*${level.toUpperCase()}*: ${message}\n`
          + `*TIME*: ${new Date()}\n`
          + `*STACK*: ${meta.stack || '--'}`,
      }),
    }),
  ],
});

const developmentFormatter = (machineHost) => combine(
  timestamp(),
  colorize(),
  label({
    label: machineHost,
  }),
  printf((i) => {
    const { stack } = i;
    const msg = JSON.stringify(i.message);
    const prefix = `${i.timestamp} [${i.label}] ${i.level}`;
    return stack ? `${prefix}: ${msg}\nSTACK: ${stack}` : `${prefix}: ${msg}`;
  }),
);

const developmentLogger = ({ machineHost }) => createLogger({
  format: developmentFormatter(machineHost),
  transports: [
    new transports.Console(),
  ],
});

const isDevelopment = (env) => env.equals(Just('development'));

const getSafeEnvs = (config) => {
  const env = getProp('nodeEnv')(config);
  const machineHost = getProp('machineHost')(config)
    .map(objOf('machineHost'));

  const slackEnvs = composeK(
    getProp('slack'),
    safe(isObject),
  )(config);

  const flatten = chain(maybeToArray);
  const [prodEnvs] = flatten([machineHost, slackEnvs]);
  const [devEnvs] = flatten([machineHost]);
  return {
    env,
    prodEnvs,
    devEnvs,
  };
};

module.exports = ({
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
  };
};
