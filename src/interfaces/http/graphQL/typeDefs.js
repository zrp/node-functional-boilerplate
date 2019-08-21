const path = require('path');
const { importSchema } = require('graphql-import');

module.exports = () => importSchema(path.join(__dirname, 'schemas', 'schema.graphql'));
