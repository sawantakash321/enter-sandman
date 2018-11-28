const { pool } = require('../../utils');

const count = parent => parent.count;
const id = parent => parent.id;
const name = parent => parent.name;

const createdAt = (parent) => {
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
  const timestamp = JSON.stringify(parent.created_at);
  return timestamp.slice(1, -1);
};

const listings = async (parent) => {
  try {
    const listingsQuery = {
      text: `SELECT applications.listing_id, listings.name
              FROM applications
              INNER JOIN listings
              ON listings.id = applications.listing_id
              WHERE applications.user_id =$1
              ORDER BY applications.created_at DESC LIMIT 3`,
      values: [parent.id]
    };

    const { rows: listingsRows } = await pool.query(listingsQuery);

    if (!listingsRows.length) {
      return 'There are no records';
    }

    return listingsRows;
  } catch (err) {
    setImmediate(() => {
      throw new Error(err);
    });
  }
};

const companies = async (parent) => {
  try {
    const companiesQuery = {
      text: `SELECT companies.id, companies.name,                             companies.created_at, teams.contact_user
              FROM teams
              INNER JOIN companies
              ON teams.company_id = companies.id
              WHERE teams.user_id = $1`,
      values: [parent.id]
    };

    const { rows: companiesRows } = await pool.query(companiesQuery);

    if (!companiesRows.length) {
      return 'There are no records';
    }

    return companiesRows;
  } catch (err) {
    setImmediate(() => {
      throw new Error(err);
    });
  }
};

const createdListings = async (parent) => {
  try {
    const createdListingsQuery = {
      text: `SELECT l.id, l.created_at, l.name, l.description
              FROM listings l
              WHERE l.created_by = $1`,
      values: [parent.id]
    };

    const { rows: createdListingsRows } = await pool.query(createdListingsQuery);

    return createdListingsRows;
  } catch (err) {
    setImmediate(() => {
      throw new Error(err);
    });
  }
};
const applications = async (parent) => {
  try {
    const applicationsQuery = {
      text: `SELECT a.id, a.created_at, a.cover_letter, l.id,
              l.name , l.description
              FROM applications a
              LEFT JOIN listings l ON l.id = a.listing_id
              WHERE a.user_id = $1`,
      values: [parent.id]
    };

    const { rows: applicationsRows } = await pool.query(applicationsQuery);

    if (!applicationsRows.length) {
      return 'There are no records';
    }
    return applicationsRows;
  } catch (err) {
    setImmediate(() => {
      throw new Error(err);
    });
  }
};

module.exports = {
  listings,
  name,
  count,
  createdAt,
  id,
  companies,
  createdListings,
  applications
};
