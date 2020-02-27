/* eslint-disable no-nested-ternary */
const compose = require('crocks/helpers/compose');
const objOf = require('crocks/helpers/objOf');
const setProp = require('crocks/helpers/setProp');
const Result = require('crocks/Result');
const isString = require('crocks/predicates/isString');
const isBoolean = require('crocks/predicates/isBoolean');
const isDate = require('crocks/predicates/isDate');
const isObject = require('crocks/predicates/isObject');
const isNumber = require('crocks/predicates/isNumber');
const isArray = require('crocks/predicates/isArray');
const isNil = require('crocks/predicates/isNil');
const either = require('crocks/pointfree/either');
const curry = require('crocks/helpers/curry');


const { Err, Ok } = Result;

const createTypeValidation = (schema) => (params) => {
  const keys = Object.keys(schema);
  const typeValidations = {
    String: isString,
    Number: isNumber,
    Boolean: isBoolean,
    Object: isObject,
    Date: isDate,
    Array: isArray,
  };


  const isCorrectType = (expectedType, value) => typeValidations[expectedType](value);

  const result = keys.map((k) => {
    const expectedType = schema[k].type;
    const currentValue = params[k];
    return (isNil(currentValue))
      ? Ok()
      : (isCorrectType(expectedType, currentValue))
        ? Ok()
        : Err(`'${k}' must be a ${expectedType}`);
  });
  return result;
};

const createRequiredValidation = (schema) => (params) => {
  const keys = Object.keys(schema);
  const missingRequired = keys.filter((k) => schema[k].required)
    .filter((param) => isNil(params[param]));
  return missingRequired.length
    ? missingRequired.map((param) => Err(`'${param}' is required`))
    : Ok();
};


const hasError = setProp('hasError');

const buildResult = (key, isError) => compose(hasError(isError), objOf(key));

const createResult = either(
  buildResult('error', true),
  buildResult('result', false),
);


const resolveSchemaValidations = curry((domain, schema) => {
  const schemaValidationsResult = [
    createTypeValidation(schema)(domain),
    createRequiredValidation(schema)(domain),
  ].flat().map(createResult);

  return schemaValidationsResult;
});

const resolveCustomValidations = curry(
  (domain, validations) => validations.map((v) => v(domain)).map(createResult),
);

const mergeValidations = curry((schemaValidationsResult, customValidationsResult) => {
  const result = [...customValidationsResult, ...schemaValidationsResult]
    .reduce((validationResultAcc, validationResultCurr) => (
      !(validationResultAcc.hasError || validationResultCurr.hasError)
        ? { errors: [...validationResultAcc.errors], hasError: false }
        : !(isNil(validationResultCurr.error))
          ? { errors: [...validationResultAcc.errors, validationResultCurr.error], hasError: true }
          : { errors: [...validationResultAcc.errors], hasError: true }
    ), { errors: [], hasError: false });

  return result;
});

const createValidations = (schema) => (validations = []) => (domain) => {
  const partialMergeValidations = compose(mergeValidations, resolveSchemaValidations(domain));
  const mergedValidations = compose(
    partialMergeValidations(schema),
    resolveCustomValidations(domain),
  )(validations);

  return !(mergedValidations.hasError)
    ? Ok(domain)
    : Err([...mergedValidations.errors]);
};
const createDomainFactory = (schema) => (params = {}) => {
  const keys = Object.keys(schema);

  const domain = keys
    .reduce((obj, k) => ({ ...obj, [k]: params[k] }), {});

  return {
    domain,
    createDomainValidate: createValidations(schema),
  };
};

module.exports = createDomainFactory;
