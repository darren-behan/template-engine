const Employee = require("./employee");

// Here we're defining the name, id and email of the Employee which is extended from the Employee class in employee.js
// We add an extra property "officeNumber" when the Employee is a Manager
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);

    this.officeNumber = officeNumber;
  }

  // This method returns "Manager" as the role of the Employee
  getRole() {
    return "Manager";
  }
  
  // This method returns the employees "office number"
  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;