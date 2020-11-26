const clearDB = (database, done) => {
  for (const i in database.connection.collections) {
    database.connection.collections[i].deleteMany(() => { });
    database.connection.collections[i].dropIndexes(() => { });
  }
  return done();
};

module.exports = async (database, done) => {
  if (database.connection.readyState === 0) {
    await database.connect(
      process.env.MONGO_DB_URL,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          throw err;
        }
        // database.set('debug', true);
        return clearDB(database, done);
      },
    );
  } else {
    return clearDB(database, done);
  }
};
