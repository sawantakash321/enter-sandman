/* eslint-disable no-console */
const { Pool, Client } = require('pg');
const config = require('../config');

const connectionString = config.DATABASE_URI;

const pool = new Pool({ connectionString });

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const checkDbConnection = async () => {
  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('Database connection check: Successful');
    await client.end();
    console.log('Database connection check: Ended');
  } catch (err) {
    throw new Error('Database connection check: ', err);
  }
};

module.exports = { pool, checkDbConnection };
