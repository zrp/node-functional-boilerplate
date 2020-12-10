const getModel = (connection, HeroModel) => connection.model(HeroModel.modelName);

module.exports = getModel;
