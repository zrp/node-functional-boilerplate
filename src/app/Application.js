const Application = ({
  config,
  server,
  database,
}) => {
  const {
    port = 80,
    mongoURL,
  } = config;

  const connectDatabase = () => database.connect(encodeURI(mongoURL), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });

  return {
    start: () => (database
      ? connectDatabase(database).then(() => server.start({ port }))
      : server.start({ port })
    ),
  };
};

module.exports = Application;
