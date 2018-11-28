const assert = require('assert');
const pg = require('pg');
const path = require('path');
const fs = require('fs');

function createIndex(callback) {
  const client = new pg.Client(process.env.DATABASE_URI);
  client.connect((err) => {
    assert(!err); // die if we cannot connect
    const file = path.resolve('./db/indexes.sql');
    const query = fs.readFileSync(file, 'utf8').toString();
    client.query(query, (__, result) => {
      client.end();
      return callback(err, result);
    });
  });
}

createIndex((err, result) => {
  if (err) {
    console.log(err);
  }
  console.log('Indexes Created!!\n', result);
});
