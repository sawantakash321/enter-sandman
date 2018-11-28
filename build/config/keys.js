"use strict";

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./dev_keys');
} else if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod_keys');
} else {
  module.exports = require('./test_keys');
}