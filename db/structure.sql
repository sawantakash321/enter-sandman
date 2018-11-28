
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS users;



CREATE TABLE users
(
	id integer PRIMARY KEY,
	created_at TIMESTAMPTZ DEFAULT now
	(),
	name character varying
	(64)
);

CREATE TABLE companies
(
	id integer PRIMARY KEY,
	created_at TIMESTAMPTZ DEFAULT now(),
	name character varying
		(64)
);

CREATE TABLE listings
(
	id integer PRIMARY KEY,
	created_at TIMESTAMPTZ DEFAULT now
			(),
	created_by integer references users
			(id),
	name character varying
			(64),
	description text
);

CREATE TABLE teams
(
	company_id integer references companies (id),
	user_id integer references users (id),
	contact_user boolean DEFAULT false,
	PRIMARY KEY(company_id, user_id)
);

CREATE TABLE applications
(
	id integer PRIMARY KEY,
	created_at TIMESTAMPTZ DEFAULT now
				(),
	user_id integer references users
				(id),
	listing_id integer references listings
				(id),
	cover_letter text
);
