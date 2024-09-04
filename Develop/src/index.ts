import inquirer from "inquirer";
import poll from "./db/connection";

function app(): void {
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "Add employee",
            "Remove employee",
            "Update employee role",
            "View all roles",
            "Add role",
            "Remove role",
            "View all departments",
            "Add department",
            "Quit"
        ]
}]).then((answers) => {
            switch (answers.action) {
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "View all employees by department":
                    viewAllEmployeesByDepartment();
                    break;
                case "View all employees by manager":
                    viewAllEmployeesByManager();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Remove employee":
                    removeEmployee();
                    break;
                case "Update employee role":
                    updateEmployeeRole();
                    break;
                case "Update employee manager":
                    updateEmployeeManager();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Remove role":
                    removeRole();
                    break;
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "Add department":
                    addDepartment();
                    break;
                case "Remove department":
                    removeDepartment();
                    break;
                case "Quit":
                    quit();
                    break;
                default:
                    break;
            }
        })};