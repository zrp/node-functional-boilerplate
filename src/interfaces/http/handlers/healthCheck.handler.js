module.exports = () => (_, res) => res
  .json({
    status: 200,
    message: 'Health check OK!',
    version: process.env.npm_package_version,
  });
