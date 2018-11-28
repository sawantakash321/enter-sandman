"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable no-console */
var _require = require('pg'),
    Pool = _require.Pool,
    Client = _require.Client;

var config = require('../config');

var connectionString = config.DATABASE_URI;
var pool = new Pool({
  connectionString: connectionString
}); // the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens

pool.on('error', function (err, client) {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

var checkDbConnection =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var client;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client = new Client({
              connectionString: connectionString
            });
            _context.prev = 1;
            _context.next = 4;
            return client.connect();

          case 4:
            console.log('Database connection check: Successful');
            _context.next = 7;
            return client.end();

          case 7:
            console.log('Database connection check: Ended');
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            throw new Error('Database connection check: ', _context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 10]]);
  }));

  return function checkDbConnection() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  pool: pool,
  checkDbConnection: checkDbConnection
};