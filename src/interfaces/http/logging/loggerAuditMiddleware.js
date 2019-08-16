// const morgan = require('morgan');

// module.exports = () => morgan((tokens, req, res) => { // eslint-disable-line consistent-return
//   if (req.user) {
//     return [
//       '[audit-api]',
//       req.user.correspondent_name,
//       req.user.name,
//       req.connection.remoteAddress,
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//     ].join(' ');
//   }
// }, {
//   skip: req => req.path.match(/status/) || req.path.match(/favicon/),
// });
