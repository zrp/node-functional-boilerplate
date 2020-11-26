const startServer = (server) => server.start();

const connectMongoDb = async (db, { mongoDb: config }) => {
  await db.connect(encodeURI(config.url), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db.set('debug', true);
};

module.exports = ({
  config,
  server,
  database,
}) => (
  connectMongoDb(database, config).then(startServer(server))
);
