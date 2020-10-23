// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, id, email, GitHubUser){
    // call parent class constructor.
        super(name, id, email);
        this.github = GitHubUser;
    }
    // Retrieve the github username.
    getGithub(){
        return this.github;
    }
   // Override role to return engineer.
    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;