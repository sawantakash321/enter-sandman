/* eslint-disable camelcase */
const { pool } = require('../../utils');

const { PAGE_SIZE = 5 } = process.env;

const topActiveUsers = async (_, args) => {
  // If no parameter is provided, set 1
  let page = 1;
  if (args.page) {
    page = parseInt(args.page, 10);
    if (Number.isNaN(page) || page < 1) {
      return 'Bad request. Invalid value in page parameter';
    }
  }

  const offset = (page - 1) * PAGE_SIZE;

  try {
    // Query to fetching overview on the most active users. Activity is a measure of total count of listings applied to. so ONLY the TOP ACTIVE USERS who have applied atleast ONCE since the past week will be fetched.

    const topActiveUserQuery = {
      text: `SELECT users.id, users.name, users.created_at,
        count(applications.user_id) AS count
        FROM applications
        INNER JOIN users ON users.id = applications.user_id
        WHERE applications.created_at >= NOW() - INTERVAL '1 week'
        GROUP BY applications.user_id, users.id
        ORDER BY 4 DESC
        OFFSET $1
        LIMIT $2`,
      values: [offset, PAGE_SIZE]
    };

    // We don't need a transaction and we just need to run a single query, the pool has a convenience method to run a query on any available client in the pool. This is the preferred way to query with node-postgres if you can as it removes the risk of leaking a client.
    const { rows: topUserActiveRows } = await pool.query(topActiveUserQuery);
    console.log(JSON.stringify(topUserActiveRows));

    if (!topUserActiveRows.length) {
      return 'there are no records';
    }

    return topUserActiveRows;
  } catch (err) {
    setImmediate(() => {
      throw new Error(err);
    });
  }
};

const users = async (_, args) => {
  // Assume id=1 if no parameter is provided
  let id = 1;
  if (args.id) {
    id = parseInt(args.id, 10);
    if (Number.isNaN(id) || id < 1) {
      return 'Bad request. Invalid value in id parameter';
    }
  }
  try {
    const getUsersByIDQuery = {
      text: `SELECT u.id, u.name,
        u.created_at
      FROM users u
      WHERE u.id = $1`,
      values: [id]
    };

    const { rows: usersRows } = await pool.query(getUsersByIDQuery);

    if (!usersRows.length) {
      return 'There are no records';
    }

    return usersRows[0];
  } catch (err) {
    setImmediate(() => {
      throw new Error(err);
    });
  }
};

module.exports = {
  topActiveUsers,
  users
};
