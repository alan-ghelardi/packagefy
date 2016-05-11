'use strict';

const format = require('util').format;
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const defaultOptions = require('./default-options');
const exclude = require('./exclude');
const withoutExtension = require('./helpers').withoutExtension;

const FUNC_ERR_MSG = 'The option `%s` must be a function';

module.exports = (baseDir, options) => {
  if (_.isEmpty(baseDir)) {
  throw new TypeError('Argument `baseDir` is required');  
  }
  
  options = _.defaults(options, defaultOptions);
  
var files = fs.readdirSync(baseDir, options.encoding);
files = exclude(files, options.exclude);

return createPackage(baseDir, files, options);
};

const createPackage = (baseDir, files, options) => {
  mustBeAFunction(options.onLoad, 'onLoad');
  mustBeAFunction(options.transform, 'transform');
  
  const packageObj = {};
  
  files.forEach((fileName) => {
    const moduleName = withoutExtension(fileName);
    const fullPath = path.join(baseDir, moduleName);  
    const module = require(fullPath);
    options.onLoad(moduleName, module);
        packageObj[options.transform(moduleName)] = module;
   });
  
  return Object.freeze(packageObj);
};

const mustBeAFunction = (candidate, optionName) => {
  if (!_.isFunction(candidate)) {
    const message = format(FUNC_ERR_MSG, optionName);
    throw new TypeError(message);
  }
};
