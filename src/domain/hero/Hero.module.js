const pipe = require('crocks/helpers/pipe');
const {
  object,
  string,
  enums,
  struct,
  optional,
  array,
} = require('superstruct');

const hasAstralHammer = (value) => value === 'Astral Hammer';
const Weapon = struct('Weapon', hasAstralHammer);
const baseOperations = pipe(string, optional);
const superPower = pipe(string, array);

const Hero = object({
  superPowers: superPower(),
  powerLevel: enums(['S', 'A', 'B', 'C', 'D']),
  baseOperations: baseOperations(),
  weapon: Weapon,
});

module.exports = Hero;
