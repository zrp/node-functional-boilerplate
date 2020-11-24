const IO = require('crocks/IO');
const getProp = require('crocks/Maybe/getProp');

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

const deployedFormatter = (machineHost) => combine(
  label({
    label: machineHost,
  }),
  timestamp(),
  json(),
);

const deployedLogger = (machineHost) => createLogger({
  format: deployedFormatter(machineHost),
  transports: [
    new transports.Console(),
    new transports.Slack({
      level: 'warn',
      channel: process.env.SLACK_WEBHOOK_CHANNEL,
      webhook_url: process.env.SLACK_WEBHOOK_URL,
      custom_formatter: (level, message, meta) => ({
        text: '*WL_MS[transaction]*\n'
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

const developmentLogger = (machineHost) => createLogger({
  format: developmentFormatter(machineHost),
  transports: [
    new transports.Console(),
  ],
});

const isDevelopment = (env) => env !== 'production' || env !== 'staging';

module.exports = ({
  config,
}) => {
  const env = getProp('nodeEnv')(config);
  const machineHost = getProp('machineHost')(config);

  const logger = isDevelopment(env) ? developmentLogger(machineHost) : deployedLogger(machineHost);

  return {
    error: IO.of(logger.error),
    info: IO.of(logger.info),
    warn: IO.of(logger.warn),
  };
};
