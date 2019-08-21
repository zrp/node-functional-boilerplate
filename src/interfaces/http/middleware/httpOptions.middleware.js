module.exports = () => (req, res, next) => (
  req.method === 'OPTIONS'
    ? res.sendStatus(200)
    : next()
);
