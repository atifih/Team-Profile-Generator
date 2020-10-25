const team = []; // Engineering team, array of objects.
const manager = require("./lib/Manager");
const engineer = require("./lib/Engineer");
const intern = require("./lib/Intern");
const inquirer = require("inquirer");
const {prompt} = inquirer;
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.joins(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { Console } = require("console");

let hasManager = false; // Does the Engineering team have a manager assigned to it?
let outputFolderExists = false; // Track whether the output folder exists or not.

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
//[] for the provided `render` function to work! ```

function writeHTMLFile(){
  // check if the `output` folder exists and create it if it
  // does not.
    if (outputFolderExists){
      fs.writeFileSync(outputPath, render(team), "utf-8"); 
    }else {
      fs.mkdir(path.join(__dirname, 'output'), (err) => { 
      if (err) { 
        return console.error(err); 
        } 
      console.log('Directory created successfully!'); 
    }) 
  }
} 
   



function createManager(){

      // Declare function as asynchronous, and save the done callback
    const  done = this.async();
    prompt([
    { 
        type: "input",
        name: "name",
        message: "Please enter the Manager's Name",
        validate: function(input) {

         // Declare function as asynchronous, and save the done callback

        // Do async stuff
        setTimeout(function() {
        if (typeof input !== "string") {
        // Pass the return value in the done callback
        done("Please enter a string ( a sequence  of characters for the Manager's name)");
        return;
        }
        // Pass the return value in the done callback
        done(true);
        }, 3000);
         }
   },
{
      type: "input",
      name: "id",
      message: "Please enter the Manager's ID number",
      validate: function(input) {

        

       // Do async stuff
        setTimeout(function() {
         if (typeof input !== "number") {
         // Pass the return value in the done callback
          done("Please enter a  number  for the Manager's ID)");
          return;
         }
          // Pass the return value in the done callback
        done(true);
        }, 3000);
      }
    },
    {
      type: "input",
      name: "email",
      message: "Please enter the Manager's email address",
      validate: function(input) {
      // regular expression for validating a valid email address.
      const  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // Do async stuff
      setTimeout(function() {
      if (!input.match(mailformat)) {
        // Pass the return value in the done callback
        done("Please enter a  valid email address for the Manager.)");
        return;
      }
      // Pass the return value in the done callback
      done(true);
      }, 3000);
    },
    },
    {
      type: "input",
      message: "Please enter the manager's office number?",
      name: "officeNumber",
      validate: function(input) {

      // Do async stuff
        setTimeout(function() {
        if (input !== "number") {
        // Pass the return value in the done callback
          done("Please enter a  number for the Manager's office number.");
          return;
        }
       // Pass the return value in the done callback
        done(true);
    }, 3000);
      } 
  },


  
  ]), (answers) => {
      // Now that we posses the Manager's details, let's add their details to the Engineering team array.
      const manager = new Manager(this.name, this.id, this.email, this.officeNumber);
      team.push(manager);
      hasManager = true; // Does the Engineering team been assigned a Manager?

      // Debug output.
      console.log("The manager object has been created successfully.");

      console.log("--------------------createManager() -----")
      console.log("The manager has: \n" + manager.name +"\n"); 
      console.log("The manager has: \n" + manager.id +"\n"); 
      console.log("The manager has: \n" + manager.email +"\n"); 
      console.log("The manager has: \n" + manager.officeNumber + "\n"); 

      (hasManager) ? createTeam() : createManager();


    }
}

function createEngineer(){
// Declare function as asynchronous, and save the done callback
    const  done = this.async();
    prompt([
    { 
        type: "input",
        name: "name",
        message: "Please enter the Engineer's  Name",
        validate: function(input) {

        // Do async stuff
        setTimeout(function() {
        if (typeof input !== "string") {
        // Pass the return value in the done callback
        done("Please enter a string ( a sequence  of characters for the Engineer's name)");
        return;
        }
        // Pass the return value in the done callback
        done(true);
        }, 3000);
        }
   },
{
      type: "input",
      name: "id",
      message: "Please enter the Engineer's ID number",
      validate: function(input) {

      // Do async stuff
        setTimeout(function() {
         if (typeof input !== "number") {
         // Pass the return value in the done callback
          done("Please enter a  number  for the Engineers's ID)");
          return;
         }
          // Pass the return value in the done callback
        done(true);
        }, 3000);
      }
    },
    {
      type: "input",
      name: "email",
      message: "Please enter the Engineer's email address",
      validate: function(input) {
      // regular expression for validating a valid email address.
      const  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // Do async stuff
      setTimeout(function() {
      if (!input.match(mailformat)) {
        // Pass the return value in the done callback
        done("Please enter a  valid email address for the Engineer.)");
        return;
      }
      // Pass the return value in the done callback
      done(true);
      }, 3000);
    },
    },
    {
      type: "input",
      message: "Please enter the Engineers's github username?",
      name: "github",
      validate: function(input) {

      // Do async stuff
        setTimeout(function() {
        if (input !== "string") {
        // Pass the return value in the done callback
          done("Please enter a  string for the Engineer's github username.");
          return;
        }
       // Pass the return value in the done callback
        done(true);
    }, 3000);
      } 
  },


  
  ]), (answers) => {
      // Now that we posses the Engineer's details, let's add their details to the Engineering team array.
      const engineer = new Manager(this.name, this.id, this.email, this.github);
      team.push(engineer);
      

      // Debug output.
      console.log("The engineer object has been created successfully.");

      console.log("--------------------createEngineer() -----")
      console.log("The engineer has: \n" + engineer.name +"\n"); 
      console.log("The engineer has: \n" + engineer.id +"\n"); 
      console.log("The engineer has: \n" + engineer.email +"\n"); 
      console.log("The engineer has: \n" + engineer.github + "\n"); 

    }
  }
  

  

function createIntern(){
     prompt([
        {
        type: "input",   // Question 1.
        name: "name",
        message: "Please enter the Intern's Name",
        validate: function(input) {

        // Do async stuff
        setTimeout(function() {
        if (typeof input !== "string") {
        // Pass the return value in the done callback
        done("Please enter a string ( a sequence  of characters for the Intern's name)");
        return;
        }
        // Pass the return value in the done callback
        done(true);
        }, 3000);
        }  
        },
        {
        type: "input",    // Question 2.
        name: "id",
        message: "Enter the Intern's ID number",
        validate: function(input) {

      // Do async stuff
        setTimeout(function() {
         if (typeof input !== "number") {
         // Pass the return value in the done callback
          done("Please enter a  number  for the Intern's ID");
          return;
         }
          // Pass the return value in the done callback
        done(true);
        }, 3000);
        },
        },
      {
        type: "input", // Question 3.
        name: "email",
        message: "Enter the Intern's email address",
        validate: function(input) {
      // regular expression for validating a valid email address.
      const  mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // Do async stuff
      setTimeout(function() {
      if (!input.match(mailformat)) {
        // Pass the return value in the done callback
        done("Please enter a  valid email address for the Intern.)");
        return;
      }
      // Pass the return value in the done callback
      done(true);
      }, 3000);
      },
    },
      {
        type: "input",   // Question 4.
        message: "Which school is the intern from?",
        name: "school",
        validate: function(input) {

        // Do async stuff
        setTimeout(function() {
        if (typeof input !== "string") {
        // Pass the return value in the done callback
        done("Please enter a string ( a sequence  of characters for the Intern's school)");
        return;
        }
        // Pass the return value in the done callback
        done(true);
        }, 3000);
        },
     }
    ]), (answers) => {
      // Now that we posses the Engineer's details, let's add their details to the Engineering team array.
      const intern = new Intern(this.name, this.id, this.email, this.school);
      team.push(intern);
      

      // Debug output.
      console.log("The engineer object has been created successfully.");

      console.log("--------------------createIntern() -----")
      console.log("The intern has: \n" + intern.name +"\n"); 
      console.log("The intern has: \n" + intern.id +"\n"); 
      console.log("The intern has: \n" + intern.email +"\n"); 
      console.log("The intern has: \n" + intern.school + "\n"); 

    }
  }
  

function createTeam(){
prompt([
  // Passing the questions in here.
   {   
       type: "list",
       name: "Create Team",
       message: "An engineering team consists of a manager and an arbitrary number of engineers and interns. To proceed with creating an engineeering team, Please select who you would like to create?",
       choices: ["Manager", "Engineer", "Intern", "Team complete"],
       default: "Manager",
   }
   
]), (answers) => {
    // Use user feedback for... whatever!!  
    switch (answers.choices) {
      case "Manager": createManager();
        break;
      case "Engineer": createEngineer();
        break;
      case "Intern": createIntern();
        break;
      case "Team complete": // Done! The engineering team has been chosen.
                            writeHTMLFile();
                            break;
      default: return;
    }
  }
}
// Invoke the application.


