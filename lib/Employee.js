class Employee {
  // Here we're defining the name, id and email of the Employee
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  // This method returns the employees "name"
  getName() {
    return this.name;
  }

  // This method returns the employees "id"
  getId() {
    return this.id;
  }

  // This method returns the employees "email"
  getEmail() {
    return this.email;
  }

  // This method returns "Employee" as the role of the Employee
  getRole() {
    return "Employee";
  }
}

module.exports = Employee;