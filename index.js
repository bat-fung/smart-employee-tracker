const { prompt } = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

init();

function init() {
  prompt([
    {
      type: 'list',
      name: 'task',
      message: 'What would you like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }
  ]).then(({task})=>{

    if(task=='view all departments') {
      db.promise().query('SELECT * FROM department').then(data=>{
        console.table(data[0]);
        init();
      })
    };
    if(task=='view all roles') {
      db.promise().query('SELECT * FROM role').then(data=>{
        console.table(data[0]);
        init();
      })
    };
    if(task=='view all employees') {
      db.promise().query('SELECT * FROM employee').then(data=>{
        console.table(data[0]);
        init();
      })
    };  
    if(task=='add a department') () => {
      db.promise().query('INSERT INTO department(name)').then(data=>{
        console.table(data[0]);
      })
      addDepartment();
    };  
  })  
};

function addDepartment() {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Type the name of the department you would like to add.',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter the name of the department you would like to add!');
          return false;
        }  
      }
    }
  ]).then(answers => {
    console.log(answers);
    const department = new Department(answers)
  })
};
