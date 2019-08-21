module.exports = ({
  server,
}) => ({
  start: () => new Promise((resolve) => resolve(server.start())),
});
