\c postgres
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;   

\c employees_db;
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    title VARCHAR(30),
    department VARCHAR(30),
    salary DECIMAL(10, 2)
);