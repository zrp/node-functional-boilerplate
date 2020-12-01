const container = require('src/container');

const database = container.resolve('database');

const cleanDatabase = require('specs/support/cleanDatabase');

const { toEqualOk } = require('./support/customMatchers');

expect.extend({
  toEqualOk,
});

beforeEach(async (done) => cleanDatabase(database, done));

afterEach(async (done) => {
  await cleanDatabase(database, done);
  return done();
});

afterAll(async (done) => {
  await cleanDatabase(database, done);
  await database.disconnect();
  return done();
});
