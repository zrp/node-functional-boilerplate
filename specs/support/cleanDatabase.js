const { mongoDb } = require('config/index');

const container = require('src/container');

const database = container.resolve('database');

const clearDB = (done) => {
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const i in database.connection.collections) {
    database.connection.collections[i].deleteMany(() => { });
    database.connection.collections[i].dropIndexes(() => { });
  }
  return done();
};

// eslint-disable-next-line consistent-return
module.exports = async (done) => {
  if (database.connection.readyState === 0) {
    await database.connect(
      mongoDb.url,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) throw err;
        return clearDB(done);
      },
    );
  } else {
    return clearDB(done);
  }
};
