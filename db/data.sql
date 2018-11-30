
insert into users
	(id, created_at, name)
values
	(1, (now() - interval
'7 days 5 hours'), 'Alice'),
(2,
(now
() - interval '7 days 7 hours'), 'Bob'),
(3,
(now
() - interval '7 days 1 hours'), 'Carl'),
(4,
(now
() - interval '7 days 4 hours'), 'Daphne'),
(5,
(now
() - interval '7 days 6 hours'), 'Evan'),
(6,
(now
() - interval '7 days 2 hours'), 'Fabi'),
(7,
(now
() - interval '7 days 2 hours'), 'Faia'),
(8,
(now
() - interval '7 days 2 hours'), 'abia'),
(9,
(now
() - interval '7 days 2 hours'), 'bia'),
(10,
(now
() - interval '7 days 2 hours'), 'ia');

insert into companies
	(id, created_at, name)
values
	(1, (now() - interval
'7 days'), 'Facewall'),
(2,
(now
() - interval '7 days 2 hours'), 'Company & Co'),
(3,
(now
() - interval '7 days 2 hours'), 'Company & Co'),
(4,
(now
() - interval '7 days 2 hours'), 'Company & Co'),
(5,
(now
() - interval '7 days 2 hours'), 'Company & Co'),
(6,
(now
() - interval '7 days 2 hours'), 'Company & Co'),
(7,
(now
() - interval '7 days 2 hours'), 'Company');

insert into teams
	(company_id, user_id, contact_user)
values
	(1, 1, TRUE),
	(7, 1, FALSE),
	(2, 2, FALSE),
	(3, 3, FALSE),
	(4, 4, TRUE),
	(5, 5, FALSE),
	(6, 9, TRUE);

insert into listings
	(id, created_at, created_by, name, description)
values
	(1, (now() - interval
'6 days'), 8, 'ID-1 Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
(2,
(now
() - interval '6 days'), 8, 'ID-2 Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
(3,
(now
() - interval '6 days'), 8, 'ID-3 Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
(4,
(now
() - interval '6 days'), 8, 'ID-4 Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
(5,
(now
() - interval '6 days'), 8, 'ID-5 Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
(6,
(now
() - interval '7 days'), 8, 'ID-6 Join us conquering the world!', 'This is your best chance to be on the right side of the equation...');

insert into applications
	(id, created_at, user_id, listing_id, cover_letter)
values
	(1, (now() - interval
'6 days'), 1, 1, 'Hello, I am Bob'),
(2,
(now
() - interval '6 days'), 2, 2, 'Hello, I am Evan'),
(3,
(now
() - interval '6 days'), 3, 3, 'Hello, I am Evan'),
(4,
(now
() - interval '6 days'), 3, 4, 'Hello, I am Evan'),
(5,
(now
() - interval '6 days'), 4, 4, 'Hello, I am Evan'),
(6,
(now
() - interval '6 days'), 5, 5, 'Hello, I am Evan'),
(7,
(now
() - interval '6 days'), 6, 5, 'Hello, I am Evan'),
(8,
(now
() - interval '6 days'), 7, 1, 'Hello, I am Evan'),
(9,
(now
() - interval '6 days'), 3, 2, 'Hello, I am Evan'),
(10,
(now
() - interval '6 days'), 1, 3, 'Hello, I am Evan');
