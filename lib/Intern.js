const Employee = require("./employee");

// Here we're defining the name, id and email of the Intern which is extended from the Employee class in employee.js
// We add an extra property "GitHub" when the Employee is an Intern
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);

    this.school = school;
  }
}

module.exports = Intern;