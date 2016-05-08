'use strict';

const helpers = module.exports;

const every = Array.prototype.every, some = Array.prototype.some, isArray = Array.isArray, slice = Array.prototype.slice;

const FILE_EXT = /\.\w+$/;

/**
 * Composes a list of predicate functions making a conjunction between them.
 * 
 * @private
 * @param {Array}
 *          predicate
 * @return {Function}
 */

helpers.conjunction = function () {
  return sequence(every, arguments);
};

  const sequence = (evaluator, params) => {
    const predicates = splat(params);
    
    return (arg) => {
  return evaluator.call(predicates, (predicate) => Boolean(predicate(arg)));
};  
};

const splat = (params) => {
  if (isArray(params[0])) {
    return params[0];
  }
  return slice.call(params, 0);
};

helpers.disjunction = function() { 
  return sequence(some, arguments);
};

helpers.withoutExtension = (fileName) => {
  const parts = fileName.split(FILE_EXT);
  return parts[0];
  };

  helpers.haveSameName = (someFile, another) => this.withoutExtension(someFile) === this.withoutExtension(another);
  