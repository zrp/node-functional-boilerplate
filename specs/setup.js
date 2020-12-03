const { toEqualOk, toEqualErr } = require('./support/customMatchers');

expect.extend({
  toEqualOk,
  toEqualErr,
});
