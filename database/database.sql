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

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE conversations(
    id SERIAL PRIMARY KEY,
    title TEXT,
    users TEXT[],
    messages JSON[] 
);

INSERT INTO conversations (title, users, messages)
	VALUES ( 
		'Japan', 
		'{"locnguyenhuu2000@gmail.com", "example@gmail.com" }',
		array['{"content":"Ohayogozaimasu!", "user": "example@gmail.com", "createdAt": "" }',  
			  '{"content":"Ohayo.", "user": "locnguyenhuu2000@gmail.com", "createdAt": "" }'
			  ]::json[]
	),
		('Chat Talk', 
		 '{ locnh@gmail.com, nguyen@gmail.com }', 
		 array['{"content":"Hello World!", "user": "locnh@gmail.com", "createdAt": "" }']::json[] 
	),
        ('Morning Talk', 
		 '{ example@gmail.com, locnguyenhuu2000@gmail.com }', 
		 array['{"content":"Good morning to you!", "user": "example@gmail.com", "createdAt": "" }']::json[] 
	);