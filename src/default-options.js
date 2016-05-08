'use strict';

const _ = require('lodash');

/**
 * The default options accepted by the library.
 */

module.exports = {
    classes: () => false,
  encoding : 'utf8',
  onLoad : _.noop,
  exclude : () => false, 
  transform : _.camelCase
};
