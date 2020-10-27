const team = []; // Engineering team, array of objects.
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { Console } = require("console");

const validNameRegEx = /^[a-zA-Z '.-]*$/; // RegEx for name validation (English)
const validEmailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // RegEx for email validation. 
const validGitHubRegEx = (/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);  // RegEx for GitHub username.



// let managerAssigned  = false; // Does the Engineering team have a manager assigned to it?
let fileExists = false; // Track whether an team.html file already exists.
let teamComplete = false; // Track when the Engineering team has been fully specified.

// Write code to use inquirer to gather information about the development team m
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
  
    // Write to  html file within theaa 'output' folder.
    
  fs.writeFile(outputPath, render(team), "utf-8", (err) => {
  if (err) throw err;
  console.log("The HTML output file: team.html has been written successfully to the 'output' folder");
  });
}   

 function createManager(){
  inquirer.prompt([
      { 
     
        type: "input",
        name: "name",
        message: "Please enter the Manager's Name",
        validate: (input) => (input.match(validNameRegEx)) ? true : "Please enter a valid Manager's name"
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the Manager's ID number",
        validate: (input) => (parseInt(input, 10) > 0 && !isNaN(input)) ? true: "Please enter a valid Manager's ID number" // Valid ID Number = counting number (postive integer)
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the Manager's email address",
        validate: (input) => (input.match(validEmailRegEx)) ? true : "Please enter a valid Manager's email address"
      },    
      { 
        type: "input",
        name: "officeNumber",
        message: "Please enter the manager's office number?",
        validate: (input) => (parseInt(input, 10) > 0 && !isNaN(input)) ? true : "Please enter a valid Manager's office number"
      }
    ])
    .then ((answers) => {
      // Create a new manager object.
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber);
        team.push(manager); // push the manager object  into the team array.
        createTeam(); // Back to 'menu'
    })
  }

function createEngineer(){
    inquirer
    .prompt([
      { 
        type: "input",
         name: "name",
        message: "Please enter the Engineer's Name",
        validate: (input) => (input.match(validNameRegEx)) ?  true : "Please enter a valid Engineer's name"
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the Engineer's ID number",
        validate: (input) => (parseInt(input, 10) > 0 && !isNaN(input))? true : "Please enter a valid Engineer's ID"
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the Engineer's email address",
        validate: (input) => (input.match(validEmailRegEx)) ? true : "Invalid email address"
      },
      {
        type: "input",
        message: "What is the Engineer's GitHub username?",
        name: "github",
        validate: (input) => (input.match(validGitHubRegEx)) ? true : "Please enter a valid GitHub username"
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      team.push(engineer);
      createTeam(); // Back to 'menu'
    })
}

function createIntern(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter  the Intern's Name",
        validate: (input) => (input.match(validNameRegEx)) ?  true : "Please enter a valid Intern's name"
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the Intern's ID number",
         validate: (input) => (parseInt(input, 10) > 0 && !isNaN(input)) ? true : "Please enter a valid Intern's ID"
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the Intern's email address",
        validate: (input) => (input.match(validEmailRegEx)) ? true : "Invalid email address"
       },
      {
        type: "input",
        name: "school",
        message: "Which school is the intern from?",
        validate: (input) => (input.match(validNameRegEx)) ?  true : "Please enter a valid school name"
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      team.push(intern);
      createTeam(); // Back to 'menu'
    })
  }
 

function createTeam(){
inquirer
.prompt([
  
  // Setting up the Questions Array.
   {   
       type: "list",
       name: "role",
       message: "An engineering team consists of a manager and an arbitrary number of engineers and interns. To proceed with creating an engineeering team, kindly select the team member you would like to create or 'Team complete'.",
       choices: ["Manager", "Engineer", "Intern", "Team complete"],
       default: "Manager"
   }
   
  ]).then((answers) => {
    // Using the  user feedback to  generate an array of 'Engineering Team' objects.

    switch (answers.role) {
          case "Manager":       if (!teamComplete){
                                createManager();
                                }
                                break;
          case "Engineer":      if (!teamComplete){
                                createEngineer();
                                }
                                break;
          case "Intern":        if (!teamComplete){
                                  createIntern();
                                }
                                break; 
          case "Team complete": // Done! The engineering team has been chosen.
                                teamComplete = true;
                                 writeHTMLFile();
                                break;
          default:              return;
        }
    });
    
  }

      
// Invoke the application, Prompt the user to select Engineering Team members to view information about.
createTeam();
