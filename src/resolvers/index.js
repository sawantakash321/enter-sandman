const usersType = require('./objectTypes/usersType.js');
const companiesType = require('./objectTypes/companiesType.js');
const applicationsType = require('./objectTypes/applicationsType.js');
const listingsType = require('./objectTypes/listingsType.js');
const teamsType = require('./objectTypes/teamsType.js');
const queryTypes = require('./queryTypes/queryTypes');

module.exports = {
  Query: { ...queryTypes },
  users: { ...usersType },
  companies: { ...companiesType },
  applications: { ...applicationsType },
  listings: { ...listingsType },
  teams: { ...teamsType }
};
