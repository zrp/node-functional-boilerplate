const modelName = 'hero';

const options = {
  collection: 'heroes',
};

const createSchema = (PowerLevelEnum, mongoose) => new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  superpower: {
    type: String,
    required: true,
  },
  powerLevel: {
    type: String,
    enum: Object.keys(PowerLevelEnum),
  },
  baseOperations: String,
  archEnemy: mongoose.Schema.Types.ObjectId,
}, options);

module.exports = ({
  mongoose,
  mongooseUtils,
  enumsModel: { PowerLevelEnum },
}) => mongooseUtils.createModel(modelName, createSchema(PowerLevelEnum, mongoose));
