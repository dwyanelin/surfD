-- function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at=NOW();
	RETURN NEW;
END;
$$ language 'plpgsql';

-- table
DROP TABLE IF EXISTS userConsultCounts;

CREATE TABLE userConsultCounts (
	id SERIAL NOT NULL PRIMARY KEY,
	userId varchar(255) UNIQUE NOT NULL,
	consultCounts INT DEFAULT 1 NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
	updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- index (userId)
CREATE UNIQUE INDEX idx_userConsultCounts_userId
	ON userConsultCounts (userId ASC);

-- trigger (updated_at)
CREATE TRIGGER trigger_update_userConsultCounts_updated_at
BEFORE UPDATE ON userConsultCounts
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();

/*
list trigger
SELECT event_object_table AS table_name ,trigger_name
FROM information_schema.triggers
GROUP BY table_name , trigger_name
ORDER BY table_name ,trigger_name;

drop trigger
DROP TRIGGER trigger_name
ON table_name;


list function
1.
SELECT routine_name
FROM information_schema.routines
WHERE routine_type='FUNCTION'
AND routine_schema='public';
   routine_name
-------------------
 update_updated_at
(1 row)

2.
\df
                                 List of functions
 Schema |           Name           | Result data type | Argument data types | Type
--------+--------------------------+------------------+---------------------+------
 public | triggerupdate_updated_at | trigger          |                     | func
(1 row)

drop function
DROP FUNCTION function_name;


list tables
SELECT * FROM information_schema.tables WHERE table_schema = 'public';
*/

DROP TABLE IF EXISTS feedback;

CREATE TABLE feedback (
	id SERIAL NOT NULL PRIMARY KEY,
	userId varchar(255) NOT NULL,
	feedback varchar(50) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);


DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id SERIAL NOT NULL PRIMARY KEY,
	userId varchar(255) UNIQUE NOT NULL,
	state varchar(8) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
	updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- index (userId)
CREATE UNIQUE INDEX idx_users_userId
	ON users (userId ASC);

-- trigger (updated_at)
CREATE TRIGGER trigger_update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at();


DROP TABLE IF EXISTS bye;

CREATE TABLE bye (
	id SERIAL NOT NULL PRIMARY KEY,
	userId varchar(255) NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);


DROP TABLE IF EXISTS windyImgur;

CREATE TABLE windyImgur (
	id SERIAL NOT NULL PRIMARY KEY,
	location varchar(8) UNIQUE NOT NULL,
	imgur varchar(128) NOT NULL,
	count int DEFAULT 1 NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- index (location)
CREATE UNIQUE INDEX idx_windyImgur_location
	ON windyImgur (location ASC);


DROP TABLE IF EXISTS mswImgur;

CREATE TABLE mswImgur (
	id SERIAL NOT NULL PRIMARY KEY,
	location varchar(8) UNIQUE NOT NULL,
	imgur varchar(256) NOT NULL,
	count int DEFAULT 1 NOT NULL,
	created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- index (location)
CREATE UNIQUE INDEX idx_mswImgur_location
	ON mswImgur (location ASC);
