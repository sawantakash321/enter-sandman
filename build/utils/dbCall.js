// This is for future usecases when the Schema gets complex and there are loads of queries scattered acorss multiple layers of resolvers. This simple function will centralize query executing.
const pg = require('pg');

module.exports = {
  executeQuery: (query, values, callback) => {
    pg.connect((connectErr, client, done) => {
      client.query(query, values, (queryErr, result) => {
        done();
        callback(queryErr, result);
      });
    });
  }
};
