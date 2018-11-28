const assert = require('assert');
const pg = require('pg');
const path = require('path');
const fs = require('fs');

function createDB(callback) {
  const client = new pg.Client(process.env.DATABASE_URI);
  client.connect((err) => {
    assert(!err); // die if we cannot connect
    const file = path.resolve('./db/structure.sql');
    const query = fs.readFileSync(file, 'utf8').toString();
    client.query(query, (__, result) => {
      client.end();
      return callback(err, result);
    });
  });
}

createDB((err, result) => {
  if (err) {
    console.log(err);
  }
  console.log('DB Tables Created!!\n', result);
});
