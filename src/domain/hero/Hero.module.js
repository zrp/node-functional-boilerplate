const pipe = require('crocks/helpers/pipe');
const {
  object,
  string,
  enums,
  define,
  optional,
  array,
} = require('superstruct');

const validate = require('../utils/validate');

const isAstralHammer = (value) => value === 'Astral Hammer';
const Weapon = define('Weapon', isAstralHammer);
const baseOperations = pipe(string, optional);
const arrayOfStrings = pipe(string, array);

const Hero = object({
  id: optional(string()),
  name: string(),
  superPowers: arrayOfStrings(),
  powerLevel: enums(['S', 'A', 'B', 'C', 'D']),
  baseOperations: baseOperations(),
  weapon: Weapon,
});

module.exports = validate(Hero);
