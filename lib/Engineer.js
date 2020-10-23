// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, id, email, username){
    // call parent class constructor.
        super(name, id, email);
        this.username = username;
    }
    // Retrieve the github username.
    getGithub(){
        return this.username;
    }
   // Override role to return engineer.
    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;