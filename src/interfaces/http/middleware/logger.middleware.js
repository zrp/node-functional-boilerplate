const unit = require('crocks/helpers/unit');
const morgan = require('morgan');

module.exports = () => morgan('combined', {
  skip: (req) => {
    const operationName = req.body ? req.body.operationName : unit();
    return req.path.match(/status/)
      || req.path.match(/favicon/)
      || operationName === 'IntrospectionQuery';
  },
});
