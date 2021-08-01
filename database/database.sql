CREATE DATABASE chatapp;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT,
    password TEXT
);

INSERT INTO users (name, email, password)
    VALUES ('loc', 'locnh@gmail.com', '$2y$10$9MYudK2CfklW8YqljOgL7.HeWG/pOAE3dq5ruovajvVKKfSxfH7/G'),
           ('nguyen', 'nguyen@gmail.com', '$2y$10$Mn2YmnJga0aXThxYlZvkNuXgLA81kMPbVv934nbMfC1q8uABV8qYy');

