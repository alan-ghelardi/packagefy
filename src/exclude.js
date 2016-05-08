'use strict';

const _ = require('lodash');
const helpers = require('./helpers');

const or = helpers.disjunction, haveSameName = helpers.haveSameName;

/**
 * 
 */

module.exports = (files, excludeOptions) => {
  const predicates = wrapIntoArray(excludeOptions).map(toPredicate);
    const exclude = or(isntEligible, or(predicates));
      
  return _.reject(files, exclude);
   };

   const wrapIntoArray = (arg) => {
   if (_.isArray(arg)) {
    return arg;
  }
   return [arg];
   };
   
   const isntEligible = (fileName) => {
               return !_.endsWith(fileName, '.js') || fileName === 'index.js';   
    };

const toPredicate = (arg) => {
  var func;
  
  if (_.isString(arg)) {
    func = _.partial(haveSameName, arg);
  } else if (_.isRegExp(arg)) {
    func = (fileName) => arg.test(fileName); 
  } else if (_.isFunction(arg)) {
    func = arg;
  } else {
    throw new TypeError('The exclude option expects a `String`, a `RegExp`, a `Function` or a collection of them');
  }
  
  return func;
};
