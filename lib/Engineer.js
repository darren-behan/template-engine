const Employee = require("./employee");

// Here we're defining the name, id and email of the Employee which is extended from the Employee class in employee.js
// We add an extra property "GitHub" when the Employee is a Engineer
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);

    this.github = github;
  }
}

module.exports = Engineer;

// In addition to Employee's properties and methods, Engineer will also have:
// github  // GitHub username
// getGithub()
// getRole() // Overridden to return 'Engineer'