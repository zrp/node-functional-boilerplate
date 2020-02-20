const Result = require('crocks/Result');

const { Ok } = Result;

const validate = (validations = []) => (domain) => (
  validations.reduce((acc, curr) => acc.chain(curr), Ok(domain))
);


module.exports = validate;
