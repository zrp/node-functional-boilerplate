const startServer = (server) => server.start();

const createConnectionMongoDb = (db, config) => db
  .createConnection(
    encodeURI(config.mongoDb.url),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

const setDebug = (db, config) => db.set('debug', config.nodeEnv !== 'production');

module.exports = ({
  config,
  server,
  database,
}) => createConnectionMongoDb(database, config)
  .then(setDebug(database, config))
  .then(startServer(server));
