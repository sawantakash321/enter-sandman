"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RateLimit = require('express-rate-limit');

var _process$env = process.env,
    NODE_ENV = _process$env.NODE_ENV,
    SESSION_SECRET = _process$env.SESSION_SECRET,
    PORT = _process$env.PORT;

var _require = require('./keys'),
    DATABASE_URI = _require.DATABASE_URI;

var CONFIG = {
  SESSION_SECRET: SESSION_SECRET,
  DATABASE_URI: DATABASE_URI,
  limiter: new RateLimit({
    windowMs: 15 * 60 * 1000,
    // 1 minute
    max: 100,
    // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached

  }),
  options: {
    port: PORT || 3000,
    endpoint: '/api',
    // disable playground in production
    playground: NODE_ENV === 'development' ? '/playground' : false
  }
};
module.exports = _objectSpread({}, CONFIG);