const startServer = (server) => server.start();
const connectMongoDb = (db, { mongoDb: config }) => db
  .connect(encodeURI(config.url), { useNewUrlParser: true });

module.exports = ({
  config,
  server,
  database,
}) => (
  connectMongoDb(database, config).then(startServer(server))
);
