const isDefined = require('crocks/core/isDefined');
const Assign = require('crocks/Assign');
const ifElse = require('crocks/logic/ifElse');
const omit = require('crocks/helpers/omit');

/* eslint-disable no-underscore-dangle */
const transform = (doc, ret) => {
  const same = (data) => data;

  const handler = (data) => {
    const objectId = data._id.toString();
    const dataWithId = Assign(data)
      .concat(Assign({ id: objectId }))
      .valueOf();
    return omit(['_id'])(dataWithId);
  };

  return ifElse(isDefined, handler, same)(ret);
};
/* eslint-enable no-underscore-dangle */

const toObjectOptions = () => ({
  getters: true,
  virtuals: false,
  minimize: false,
  versionKey: false,
  transform,
});

module.exports = {
  toObjectOptions,
};
