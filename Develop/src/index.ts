import inquirer from "inquirer";
import { pool } from "./db/connection.js";

function app(): void {
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
            "Quit"
        ]
    }).then(({ action }) => {
        switch (action) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "view All Employees by Department":
                // viewAllEmployeesByDepartment();
                break;
            case "view All Employees by Manager":
                // viewAllEmployeesByManager();
                break;
            case "Add An Employee":
                addEmployee();
                break;
            case "Remove Employee":
                // removeEmployee();
                break;
            case "Update Employee Role":
                // updateEmployeeRole();
                break;
            case "Update Employee Manager":
                // updateEmployeeManager();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                // addRole();
                break;
            case "view All Departments":
                viewAllDepartments();
                break;
            case "Add Department":
                // addDepartment();
                break;
            

            case "Quit":
                
                pool.end();
                break;
                default:
                    console.log("Invalid action");
                    app();
        }
    });
}

async function viewAllEmployees(): Promise<void> {
   const sql = "SELECT employee.id, employee.first_name AS \"first name\", employee.last_name AS \"last name\", role.title, department.name AS department, role.salary, manager.first_name || ' ' || manager.last_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"

    const employees = await pool.query(sql);
    console.table(employees.rows);
    app();
}

async function viewAllDepartments(): Promise<void> {
    const sql = "SELECT * FROM department";
    const departments = await pool.query(sql);
    console.table(departments.rows);
    app();
}

async function viewAllRoles(): Promise<void> {
    const sql = "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id;";
    const roles = await pool.query(sql);
    console.table(roles.rows);
    app();
}

async function addEmployee(): Promise<void> {
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
   })
}

app();
