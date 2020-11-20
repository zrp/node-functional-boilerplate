
const addSuperPower = (domain, newSuperPower) => {
  const newSuperPowers = [...domain.superPowers, newSuperPower];
  return {
    ...domain,
    superPowers: newSuperPowers,
  };
};

module.exports = {
  addSuperPower,
};
