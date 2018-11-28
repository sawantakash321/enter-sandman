"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable camelcase */
var _require = require('../../utils'),
    pool = _require.pool;

var _process$env$pageSize = process.env.pageSize,
    pageSize = _process$env$pageSize === void 0 ? 5 : _process$env$pageSize;

var topActiveUsers =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_, args) {
    var page, offset, topActiveUserQuery, _ref2, topUserActiveRows;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // If no parameter is provided, set 1
            page = 1;

            if (!args.page) {
              _context.next = 5;
              break;
            }

            page = parseInt(args.page, 10);

            if (!(Number.isNaN(page) || page < 1)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", 'Bad request. Invalid value in page parameter');

          case 5:
            offset = (page - 1) * pageSize;
            _context.prev = 6;
            // Query to fetching overview on the most active users. Activity is a measure of total count of listings applied to. so ONLY the TOP ACTIVE USERS who have applied atleast ONCE since the past week will be fetched.
            topActiveUserQuery = {
              text: "SELECT users.id, users.name, users.created_at,\n        count(applications.user_id) AS count\n        FROM applications\n        INNER JOIN users ON users.id = applications.user_id\n        WHERE applications.created_at >= NOW() - INTERVAL '1 week'\n        GROUP BY applications.user_id, users.id\n        ORDER BY 4 DESC\n        OFFSET $1\n        LIMIT $2",
              values: [offset, pageSize]
            }; // We don't need a transaction and we just need to run a single query, the pool has a convenience method to run a query on any available client in the pool. This is the preferred way to query with node-postgres if you can as it removes the risk of leaking a client.

            _context.next = 10;
            return pool.query(topActiveUserQuery);

          case 10:
            _ref2 = _context.sent;
            topUserActiveRows = _ref2.rows;
            console.log(JSON.stringify(topUserActiveRows));

            if (topUserActiveRows.length) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", 'there are no records');

          case 15:
            return _context.abrupt("return", topUserActiveRows);

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](6);
            setImmediate(function () {
              throw new Error(_context.t0);
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[6, 18]]);
  }));

  return function topActiveUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var users =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_, args) {
    var id, getUsersByIDQuery, _ref4, usersRows;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Assume id=1 if no parameter is provided
            id = 1;

            if (!args.id) {
              _context2.next = 5;
              break;
            }

            id = parseInt(args.id, 10);

            if (!(Number.isNaN(id) || id < 1)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", 'Bad request. Invalid value in id parameter');

          case 5:
            _context2.prev = 5;
            getUsersByIDQuery = {
              text: "SELECT u.id, u.name,\n        u.created_at\n      FROM users u\n      WHERE u.id = $1",
              values: [id]
            };
            _context2.next = 9;
            return pool.query(getUsersByIDQuery);

          case 9:
            _ref4 = _context2.sent;
            usersRows = _ref4.rows;

            if (usersRows.length) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", 'There are no records');

          case 13:
            return _context2.abrupt("return", usersRows[0]);

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](5);
            setImmediate(function () {
              throw new Error(_context2.t0);
            });

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[5, 16]]);
  }));

  return function users(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  topActiveUsers: topActiveUsers,
  users: users
};