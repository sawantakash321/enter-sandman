"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../../utils'),
    pool = _require.pool;

var count = function count(parent) {
  return parent.count;
};

var id = function id(parent) {
  return parent.id;
};

var name = function name(parent) {
  return parent.name;
};

var createdAt = function createdAt(parent) {
  /*
    Logic to print Datestamp with time zone in client friendly manner
    Input:  2018-08-15T05:08:50.095Z
    Output: 6/23/2018 7:38:50 AM
   let value = parent.created_at;
  if (value) {
    value = `${value.toLocaleDateString()} ${value.toLocaleTimeString()}`;
  } else {
    value = '';
  }
  */
  var timestamp = JSON.stringify(parent.created_at);
  return timestamp.slice(1, -1);
};

var listings =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(parent) {
    var listingsQuery, _ref2, listingsRows;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            listingsQuery = {
              text: "SELECT applications.listing_id, listings.name\n              FROM applications\n              INNER JOIN listings\n              ON listings.id = applications.listing_id\n              WHERE applications.user_id =$1\n              ORDER BY applications.created_at DESC LIMIT 3",
              values: [parent.id]
            };
            _context.next = 4;
            return pool.query(listingsQuery);

          case 4:
            _ref2 = _context.sent;
            listingsRows = _ref2.rows;

            if (listingsRows.length) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", 'There are no records');

          case 8:
            return _context.abrupt("return", listingsRows);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            setImmediate(function () {
              throw new Error(_context.t0);
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 11]]);
  }));

  return function listings(_x) {
    return _ref.apply(this, arguments);
  };
}();

var companies =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(parent) {
    var companiesQuery, _ref4, companiesRows;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            companiesQuery = {
              text: "SELECT companies.id, companies.name,                             companies.created_at, teams.contact_user\n              FROM teams\n              INNER JOIN companies\n              ON teams.company_id = companies.id\n              WHERE teams.user_id = $1",
              values: [parent.id]
            };
            _context2.next = 4;
            return pool.query(companiesQuery);

          case 4:
            _ref4 = _context2.sent;
            companiesRows = _ref4.rows;

            if (companiesRows.length) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", 'There are no records');

          case 8:
            return _context2.abrupt("return", companiesRows);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            setImmediate(function () {
              throw new Error(_context2.t0);
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 11]]);
  }));

  return function companies(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var createdListings =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(parent) {
    var createdListingsQuery, _ref6, createdListingsRows;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            createdListingsQuery = {
              text: "SELECT l.id, l.created_at, l.name, l.description\n              FROM listings l\n              WHERE l.created_by = $1",
              values: [parent.id]
            };
            _context3.next = 4;
            return pool.query(createdListingsQuery);

          case 4:
            _ref6 = _context3.sent;
            createdListingsRows = _ref6.rows;
            return _context3.abrupt("return", createdListingsRows);

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            setImmediate(function () {
              throw new Error(_context3.t0);
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 9]]);
  }));

  return function createdListings(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var applications =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(parent) {
    var applicationsQuery, _ref8, applicationsRows;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            applicationsQuery = {
              text: "SELECT a.id, a.created_at, a.cover_letter, l.id,\n              l.name , l.description\n              FROM applications a\n              LEFT JOIN listings l ON l.id = a.listing_id\n              WHERE a.user_id = $1",
              values: [parent.id]
            };
            _context4.next = 4;
            return pool.query(applicationsQuery);

          case 4:
            _ref8 = _context4.sent;
            applicationsRows = _ref8.rows;

            if (applicationsRows.length) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", 'There are no records');

          case 8:
            return _context4.abrupt("return", applicationsRows);

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            setImmediate(function () {
              throw new Error(_context4.t0);
            });

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 11]]);
  }));

  return function applications(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

module.exports = {
  listings: listings,
  name: name,
  count: count,
  createdAt: createdAt,
  id: id,
  companies: companies,
  createdListings: createdListings,
  applications: applications
};