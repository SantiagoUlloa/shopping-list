CREATE TABLE users (
    id SERIAL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(50)
);

CREATE TABLE todos (
    id SERIAL,
    name VARCHAR(100)
);

CREATE TABLE user_todolist (
    user_id SERIAL,
    todo_id SERIAL
);