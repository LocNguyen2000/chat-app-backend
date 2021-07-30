CREATE DATABASE chatapp;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

INSERT INTO users (name, email)
    VALUES ('loc', 'locnh@mail'),
           ('nguyen', 'nguyen@mail');