const { Just } = require('crocks/Maybe');

const isDevelopment = (env) => env.equals(Just('development'));

module.exports = isDevelopment;
