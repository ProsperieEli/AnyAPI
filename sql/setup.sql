-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS movies;

CREATE TABLE movies(
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    release_year INT NOT NULL,
    director TEXT NOT NULL
);