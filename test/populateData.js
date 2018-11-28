const assert = require('assert');
const pg = require('pg');
const path = require('path');
const fs = require('fs');

function populateData(callback) {
  const client = new pg.Client(process.env.DATABASE_URI);
  client.connect((err) => {
    assert(!err); // die if we cannot connect
    const file = path.resolve('./db/data.sql');
    const query = fs.readFileSync(file, 'utf8').toString();
    client.query(query, (__, result) => {
      client.end();
      return callback(err, result);
    });
  });
}

populateData((err, result) => {
  if (err) {
    console.log(err.stack);
  }
  console.log('Test Data Inserted!!\n', result);
});
