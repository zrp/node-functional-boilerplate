const isEmpty = require('crocks/core/isEmpty');
const ifElse = require('crocks/logic/ifElse');
const { Rejected } = require('crocks/Async');

const rejectEmptyTenant = () => Rejected({ message: 'Empty tenantId' });

const connectTenant = (connectionPool) => (tenantId) => connectionPool.useDb(tenantId);

/**
 * Mongoose has one connection by default,
 * so we use the second connection created
 * by this application on start up
 */
const extractConnection = (connections) => connections[1];

const tenantConnection = (connections) => {
  const connectionPool = extractConnection(connections);

  return ifElse(
    isEmpty,
    rejectEmptyTenant,
    connectTenant(connectionPool),
  );
};

module.exports = tenantConnection;
