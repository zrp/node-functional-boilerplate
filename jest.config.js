module.exports = {
  verbose: true,
  testEnvironment: 'node',
  coverageReporters: [
    'text-summary',
    'html',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/app/application.js',
    '!src/interfaces/http/server.js',
    '!src/interfaces/http/routers/*',
  ],
  setupFilesAfterEnv: [
    './specs/setup.js',
  ],
};
