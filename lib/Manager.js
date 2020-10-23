// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name, id, email, officeNumber){
    // call parent class constructor.
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    // Retrieve the School.
    getOfficeNumber(){
        return this.officeNumber;
    }
   // Override role to return intern.
    getRole(){
        return "Manager";
    }
}

module.exports = Manager;