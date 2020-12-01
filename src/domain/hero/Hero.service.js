const addSuperPower = (newSuperPower) => (domain) => {
  const newSuperPowers = [...domain.superPowers, newSuperPower];
  return {
    ...domain,
    superPowers: newSuperPowers,
  };
};

module.exports = {
  addSuperPower,
};
