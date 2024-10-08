import inquirer from "inquirer";
import { pool } from "./db/connection.js";
function app() {
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "Update An Employee Role",
        ]
    }).then(({ action }) => {
        switch (action) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add An Employee":
                addEmployee();
                break;
            case "Update An Employee Role":
                updateEmployeeRole();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add A Role":
                addRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add A Department":
                addDepartment();
                break;
        }
    });
}
async function viewAllEmployees() {
    const sql = "SELECT employee.id, employee.first_name AS \"first name\", employee.last_name AS \"last name\", role.title, department.name AS department, role.salary, manager.first_name || ' ' || manager.last_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;";
    const employees = await pool.query(sql);
    console.table(employees.rows);
    app();
}
async function viewAllDepartments() {
    const sql = "SELECT * FROM department";
    const departments = await pool.query(sql);
    console.table(departments.rows);
    app();
}
async function viewAllRoles() {
    const sql = "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;";
    const roles = await pool.query(sql);
    console.table(roles.rows);
    app();
}
async function addEmployee() {
    const roles = await pool.query("SELECT id as value, title as name FROM role");
    const employees = await pool.query("SELECT id as value, first_name || ' ' || last_name as name FROM employee");
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter employee's first name"
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter employee's last name"
        },
        {
            type: "list",
            name: "role_id",
            message: "Select employee's role",
            choices: roles.rows
        },
        {
            type: "list",
            name: "manager_id",
            message: "Select employee's manager",
            choices: employees.rows
        }
    ]).then((answers) => {
        const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
        pool.query(sql, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
        app();
    });
}
async function addRole() {
    const departments = await pool.query("SELECT id as value, name as name FROM department");
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter role title"
        },
        {
            type: "input",
            name: "salary",
            message: "Enter role salary"
        },
        {
            type: "list",
            name: "department_id",
            message: "Select department",
            choices: departments.rows
        }
    ]).then((answers) => {
        const sql = "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)";
        pool.query(sql, [answers.title, answers.salary, answers.department_id]);
        app();
    });
}
async function updateEmployeeRole() {
    const employees = await pool.query("SELECT id as value, first_name || ' ' || last_name as name FROM employee");
    const roles = await pool.query("SELECT id as value, title as name FROM role");
    inquirer.prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Select employee to update",
            choices: employees.rows
        },
        {
            type: "list",
            name: "role_id",
            message: "Select new role",
            choices: roles.rows
        }
    ]).then((answers) => {
        const sql = "UPDATE employee SET role_id = $1 WHERE id = $2";
        pool.query(sql, [answers.role_id, answers.employee_id]);
        app();
    });
}
async function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter department name"
        }
    ]).then((answers) => {
        const sql = "INSERT INTO department (name) VALUES ($1)";
        pool.query(sql, [answers.name]);
        app();
    });
}
app();
