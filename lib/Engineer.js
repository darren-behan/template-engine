const Employee = require("./employee");

// Here we're defining the name, id and email of the Employee which is extended from the Employee class in employee.js
// We add an extra property "GitHub" when the Employee is a Engineer
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);

    this.github = github;
  }

  // This method returns "Engineer" as the role of the Employee
  getRole() {
    return "Engineer";
  }

  // This method returns the employees "github" username
  getGithub() {
    return this.github;
  }
}

module.exports = Engineer;