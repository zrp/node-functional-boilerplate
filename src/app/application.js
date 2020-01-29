const startServer = server => server.start();
const connectMongoDb = (db, { mongoDb: config }) => db.connect(encodeURI(config.url), { useNewUrlParser: true });

module.exports = ({
  config,
  server,
  mongoose,
}) => (
  connectMongoDb(mongoose, config).then(startServer(server))
);

