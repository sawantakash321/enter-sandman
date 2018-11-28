"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var usersType = require('./objectTypes/usersType.js');

var companiesType = require('./objectTypes/companiesType.js');

var applicationsType = require('./objectTypes/applicationsType.js');

var listingsType = require('./objectTypes/listingsType.js');

var teamsType = require('./objectTypes/teamsType.js');

var queryTypes = require('./queryTypes/queryTypes');

module.exports = {
  Query: _objectSpread({}, queryTypes),
  users: _objectSpread({}, usersType),
  companies: _objectSpread({}, companiesType),
  applications: _objectSpread({}, applicationsType),
  listings: _objectSpread({}, listingsType),
  teams: _objectSpread({}, teamsType)
};