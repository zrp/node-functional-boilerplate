const env = require('env-var');

module.exports = {
  slackWebHookChannel: env.get('SLACK_WEBHOOK_CHANNEL').required().asString(),
  slackWebHookUrl: env.get('SLACK_WEBHOOK_URL').required().asUrlString(),
};
