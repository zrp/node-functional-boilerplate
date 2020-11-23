const clearDB = (database, done) => {
  for (const i in database.connection.collections) {
    database.connection.collections[i].deleteMany(() => { });
    database.connection.collections[i].dropIndexes(() => { });
  }
  return done();
}

module.exports = async (database, done) => {
  
  if (database.connection.readyState === 0) {
    await database.connect(
      `${process.env.MONGO_URL}${process.env.TEST_SUITE}`,
      { 
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      (err) => {
        if (err) {
          throw err;
        }
        return clearDB(database, done);
      }
    );
  } else {
    return clearDB(database, done);
  }
};
