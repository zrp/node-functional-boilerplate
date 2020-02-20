const mongoose = require('mongoose');


const PowerLevelEnum = {
  S: 'S',
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
};

const options = {
  collection: 'heroes',
};

const HeroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  superPower: {
    type: String,
    required: true,
  },
  powerLevel: {
    type: String,
    enum: Object.keys(PowerLevelEnum),
  },
  weapon: String,
  baseOperations: String,
}, options);

const HeroModel = mongoose.model('Hero', HeroSchema);

module.exports = HeroModel;
