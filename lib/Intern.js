// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, id, email, school){
    // call parent class constructor.
        super(name, id, email);
        this.school= school;
    }
    // Retrieve the School.
    getSchool(){
        return this.school;
    }
   // Override role to return intern.
    getRole(){
        return "Intern";
    }
}

module.exports = Intern;