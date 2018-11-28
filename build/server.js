"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-console */
// Load environment variables from .env file
require('dotenv').config();

var _require = require('graphql-yoga'),
    GraphQLServer = _require.GraphQLServer;

var helmet = require('helmet');

var cors = require('cors');

var morgan = require('morgan');

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var _require2 = require('./utils'),
    checkDbConnection = _require2.checkDbConnection;

var _require3 = require('./resolvers'),
    Query = _require3.Query,
    companies = _require3.companies,
    teams = _require3.teams,
    applications = _require3.applications,
    listings = _require3.listings,
    users = _require3.users;

var config = require('./config');

var resolvers = {
  Query: Query,
  companies: companies,
  teams: teams,
  applications: applications,
  listings: listings,
  users: users
};
var typeDefs = './src/schema/schema.graphql';
var server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: function context(req) {
    return _objectSpread({}, req);
  }
}); // don't show the log when it is testing

if (process.env.NODE_ENV !== 'testing') {
  // Check database connection
  checkDbConnection(); // use morgan to log at command line

  server.express.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
} // HTTP security middleware


server.express.use(helmet()); // only if you're behind a reverse proxy
// (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

server.express.enable('trust proxy'); //  apply rate limiter to all requests

server.express.use(config.limiter); // Body parser middleware

server.express.use(bodyParser.urlencoded({
  extended: false
}));
server.express.use(bodyParser.json()); // allow cross-origin requests

server.express.use(cors());
server.express.use(cookieParser());
server.start(config.options, function (_ref) {
  var port = _ref.port;
  console.log("Server running at http://localhost:".concat(port));
});
module.exports = {
  server: server
};