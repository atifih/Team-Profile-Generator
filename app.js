const team = []; // Engineering team, array of objects.
const manager = require("./lib/Manager");
const engineer = require("./lib/Engineer");
const intern = require("./lib/Intern");
const inquirer = require("inquirer");
// const {prompt} = inquirer;
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { Console } = require("console");

let managerAssigned  = false; // Does the Engineering team have a manager assigned to it?
let outputFolderExists = false; // Track whether the output folder exists or not.
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
  // check if the `output` folder exists and create it if it
  // does not.
    if (!outputFolderExists){
      fs.mkdir(path.join(__dirname, 'output'), (err) => { 
      if (err) { 
        return console.error(err); 
        } 
      console.log('Directory created successfully!'); 
    outputFolderExists = true;

    }) 
    fs.writeFileSync(outputPath, render(team), "utf-8");
  }
} 
 
function createManager(){
  inquirer.prompt([
      { 
     
        type: "input",
        name: "name",
        message: "Please enter the Manager's Name",
        validate: (input) => {
          (typeof (input) !== "string") ?  "Please enter a valid name." : true;
        }
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the Manager's ID number",
        validate: (input) => {
          ( parseInt(input, 10) > 0) ? true: "Please enter a valid ID number"
        }
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the Manager's email address",
        validate: (input) => {
          const validEmailFormat = input.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
          (validEmailFormat) ?  true : "Please enter a valid email address"
        
         },
      },    
      { 
        type: "input",
        name: "officeNumber",
        message: "Please enter the manager's office number?",
        validate: (input) => {
          (parseInt(input) > 0) ? true : "Please enter a valid office number"
        }
      },
    ])
    .then ((answers) => {
      // Create a new manager object.
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber);
        team.push(manager); // push the manager object  into the team array.
        return;
    });
  }

function createEngineer(){
    inquirer
    .prompt([
      { 
        type: "input",
         name: "name",
        message: "Please enter the Engineer's Name",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the Engineer's ID number",
        validate: (input) => {
          (parseInt(input, 10) > 0)
            ? true
            : "Please enter a valid number"
      },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the Engineer's email address",
        validate: (input) => {
          
      // regular expression for validating a valid email address.
      const  emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
           (input.match(emailFormat)) ? true : "Invalid email address"
          },
      },
      {
        type: "input",
        message: "What is the Engineer's GitHub username?",
        name: "github",
        validate: (input) => {
          (typeof input === "string") ? true : "Please enter a valid GitHub username"
        },
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
       // Debug output.
      console.log("The engineer object has been created successfully.");

      console.log("--------------------createEngineer() -----");
      console.log("The engineer has: \n" + engineer.name +"\n"); 
      console.log("The engineer has: \n" + engineer.id +"\n"); 
      console.log("The engineer has: \n" + engineer.email +"\n"); 
      console.log("The engineer has: \n" + engineer.github + "\n"); 

    })
}

function createIntern(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter  the Intern's Name",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the Intern's ID number",
        validate: (input) =>
          Number.isInteger(Number(input)) && Number(input) > 0
            ? true
            : "Please enter a valid number",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the Intern's email address",
        validate: (input) =>
          /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(input)
            ? true
            : "Please enter a valid email address",
      },
      {
        type: "input",
        name: "school",
        message: "Which school is the intern from?",
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
      // Debug output.
      console.log("The engineer object has been created successfully.");

      console.log("--------------------createIntern() -----")
      console.log("The intern has: \n" + intern.name +"\n"); 
      console.log("The intern has: \n" + intern.id +"\n"); 
      console.log("The intern has: \n" + intern.email +"\n"); 
      console.log("The intern has: \n" + intern.school + "\n"); 

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
    // Use user feedback for... whatever!!  
    switch (answers.role) {
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
  })
}
      
// Invoke the application.
createTeam();
    


