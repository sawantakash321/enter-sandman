const companiesType = require('./objectTypes/companiesType.js');
const teamsType = require('./objectTypes/teamsType.js');
const queryTypes = require('./queryTypes/queryTypes');

module.exports = {
  Query: { ...queryTypes },
  companies: { ...companiesType },
  teams: { ...teamsType }
};
