const startServer = (server) => server.start();

const connectMongoDb = (db, config) => db
  .connect(
    encodeURI(config.mongoDb.url),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => db.set('debug', config.nodeEnv !== 'production'));

module.exports = ({
  config,
  server,
  database,
}) => (
  connectMongoDb(database, config)
    .then(startServer(server))
);
