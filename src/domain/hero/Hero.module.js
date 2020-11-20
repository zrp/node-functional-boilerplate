const pipe = require('crocks/helpers/pipe');
const {
  object,
  string,
  enums,
  struct,
  optional,
  array,
} = require('superstruct');

const validate = require('../utils/validate');

const hasAstralHammer = (value) => value === 'Astral Hammer';
const Weapon = struct('Weapon', hasAstralHammer);
const baseOperations = pipe(string, optional);
const arrayOfStrings = pipe(string, array);

const Hero = object({
  superPowers: arrayOfStrings(),
  powerLevel: enums(['S', 'A', 'B', 'C', 'D']),
  baseOperations: baseOperations(),
  weapon: Weapon,
});


module.exports = validate(Hero);
