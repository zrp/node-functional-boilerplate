module.exports = {
  port: process.env.EXPRESS_PORT || 3000,
  corsOrigin: process.env.CORS_ORIGIN,
  corsHeaders: process.env.CORS_HEADERS,
  corsMethods: process.env.CORS_METHODS,
  corsExposeHeaders: process.env.CORS_EXPOSE_HEADERS,
};
