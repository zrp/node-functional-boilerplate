const Async = require('crocks/Async');

const { fromPromise } = Async;

const startServer = (server) => Async.Resolved(server.start());
const connectMongoDb = fromPromise(
  (db, { mongoDb: config }) => db.connect(encodeURI(config.url), { useNewUrlParser: true }),
);

module.exports = ({
  config,
  server,
  mongoose,
}) => (
  connectMongoDb(mongoose, config)
    .chain(() => startServer(server))
);
