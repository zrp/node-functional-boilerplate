const modelName = 'villain';

const options = {
  collection: 'villains',
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
  lair: String,
  rival: mongoose.Schema.Types.ObjectId,
}, options);

module.exports = ({
  mongoose,
  mongooseUtils,
  enumsModel: { PowerLevelEnum },
}) => mongooseUtils.createModel(modelName, createSchema(PowerLevelEnum, mongoose));
