const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// util is used for node.js internal APIs
const util = require("util");

// function to write the file based on user data returning resolved if successful or reject if there was an error
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");

let numberOfEmployees = [];
const employeeData = [];

init();

async function numberOfTeamMembers() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "team_total",
        message: "How many members are in your team?",
      },
    ])
    .then((response) => {
      const number = response.team_total;
      numberOfEmployees.push(number);
    });
}

async function promptUser(number) {
  console.log("The first team member to add will be your Manager.");
  await inquirer
    .prompt([
      {
        type: "input",
        name: "name_manager",
        message: "What is your Manager's name?",
      },
      {
        type: "input",
        name: "id_manager",
        message: "What is your Manager's id?",
      },
      {
        type: "input",
        name: "email_manager",
        message: "What is your Manager's email?",
      },
      {
        type: "input",
        name: "officePhoneNumber",
        message: "What is your Manager's office phone number?",
      },
    ])
    .then((response) => {
      const {
        name_manager,
        id_manager,
        email_manager,
        officePhoneNumber,
      } = response;
      const manager = new Manager(
        name_manager,
        id_manager,
        email_manager,
        officePhoneNumber
      );
      employeeData.push(manager);
    });

  for (let i = 0; i < number - 1; i++) {
    await inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "Which additional team member would you like to add?",
          choices: ["Engineer", "Intern"],
        },
        {
          type: "input",
          name: "name_engineer",
          message: "What is your Engineer's name?",
          when: (answer) => {
            return answer.role === "Engineer";
          },
        },
        {
          type: "input",
          name: "id_engineer",
          message: "What is your Engineer's id?",
          when: (answer) => {
            return answer.role === "Engineer";
          },
        },
        {
          type: "input",
          name: "email_engineer",
          message: "What is your Engineer's email?",
          when: (answer) => {
            return answer.role === "Engineer";
          },
        },
        {
          type: "input",
          name: "github",
          message: "What is your Github username?",
          when: (answer) => {
            return answer.role === "Engineer";
          },
        },
        {
          type: "input",
          name: "name_intern",
          message: "What is your Intern's name?",
          when: (answer) => {
            return answer.role === "Intern";
          },
        },
        {
          type: "input",
          name: "id_intern",
          message: "What is your Intern's id?",
          when: (answer) => {
            return answer.role === "Intern";
          },
        },
        {
          type: "input",
          name: "email_intern",
          message: "What is your Intern's email?",
          when: (answer) => {
            return answer.role === "Intern";
          },
        },
        {
          type: "input",
          name: "school",
          message: "What is your Intern's school?",
          when: (answer) => {
            return answer.role === "Intern";
          },
        },
      ])
      .then((response) => {
        const {
          name_engineer,
          id_engineer,
          email_engineer,
          github,
          name_intern,
          id_intern,
          email_intern,
          school,
        } = response;

        if (name_engineer !== undefined) {
          const engineer = new Engineer(
            name_engineer,
            id_engineer,
            email_engineer,
            github
          );
          employeeData.push(engineer);
        }

        if (name_intern !== undefined) {
          const intern = new Intern(
            name_intern, 
            id_intern, 
            email_intern, 
            school
          );
          employeeData.push(intern);
        }
      });
  }
}

// function to prompt the user with a series of questions to gather data for the file being created
async function init() {
  console.log("Let's build your team 🛠");

  try {
    await numberOfTeamMembers();
    const number = numberOfEmployees[0];

    await promptUser(number);
    console.log(employeeData);
    render(employeeData);

    // function pauses whilst writing the file with the content from "readme"
    await writeFileAsync(outputPath, render(employeeData));

    // notifies the user if successful
    console.log("Successfully wrote to README.md");
  } catch (err) {
    // notifies the user if there was an error
    console.log(err);
  }
}
