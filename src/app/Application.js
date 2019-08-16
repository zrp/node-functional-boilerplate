const Application = ({
  server,
  database,
}) => {
  const connectDatabase = () => database.connect(
    encodeURI(process.env.MONGO_URL),
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    },
  );

  return {
    start() {
      if (database) {
        return connectDatabase()
          .then(() => server.start());
      }
      return server.start();
    },
  };
};

module.exports = Application;
