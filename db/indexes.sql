-- Default indexes
-- Creating at least one index on every table speeds up queries. Ids are the usual target for filtering.

DROP INDEX IF EXISTS users_idx;
DROP INDEX IF EXISTS applications_idx;
DROP INDEX IF EXISTS listings_idx;
DROP INDEX IF EXISTS companies_idx;
DROP INDEX IF EXISTS teams_idx;
DROP INDEX IF EXISTS applications_users_idx;
DROP INDEX IF EXISTS applications_created_idx;
DROP INDEX IF EXISTS teams_users_idx;
DROP INDEX IF EXISTS listings_users_idx;


-- The email column has a unique constraint, which should cover the unique email addresses requirement, with a btree index, that will help with efficient lookups.


CREATE INDEX users_idx ON users USING btree
(id);
CREATE INDEX applications_idx ON applications USING btree
(id);
CREATE INDEX listings_idx ON listings USING btree
(id);
CREATE INDEX companies_idx ON companies USING btree
(id);
CREATE INDEX teams_idx ON teams USING btree
(company_id, user_id);

-- Performance indexes
-- We also need an index on the user_id of the applications table to speed up pagination because it relies on this
-- column. This index is used several times on other queries
CREATE INDEX applications_users_idx ON applications USING btree
(user_id);
-- This index is to optimize the last 3 applied listings in the top active users query
CREATE INDEX applications_created_idx ON applications USING btree
(created_at);
-- This index makes all the difference in execution time when finding connected companies
CREATE INDEX teams_users_idx ON teams USING btree
(user_id);
-- This is for users created listings
CREATE INDEX listings_users_idx ON listings USING btree
(created_by);