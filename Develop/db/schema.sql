\c postgres; 
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;   

\c employees_db;
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT
    
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);
