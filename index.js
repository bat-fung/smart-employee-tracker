const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

// Application menu
function start(){
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'start',
        message: 'Information is available for departments, roles, and employees.  What would you like to do?',
        choices: ['View', 'Add', 'Update', 'Exit']
      }
    ]).then (function(res){
      switch(res.start){
        case 'View':
          view();
          break;
        case 'Add':
          add();
          break;
        case 'Update':
          updateEmployee();
        break;
        case 'Exit':
          console.log('-------');
          console.log('Bye-bye');
          console.log('-------');
          break;
        break;
      default:  
          console.log('default');
      }
    });
}

// 'View' functions
function view(){
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'view',
        message: 'Select an option:',
        choices: ['All departments', 'All roles', 'All employees']
      }
    ]).then(function(res){
      switch(res.view){
        case 'All departments':
          viewAllDepartments();
          break;
        case 'All roles':
          viewAllRoles();
          break;
        case 'All employees':
          viewAllEmployees();
          break;  
        default:
          console.log('default');    
      }
    });
}

function viewAllDepartments(){
  db.promise().query('SELECT * FROM department').then(data=>{
    console.table(data[0]);
    start();
  })
}

function viewAllRoles(){
  db.promise().query('SELECT * FROM role').then(data=>{
    console.table(data[0]);
    start();
  })
}

function viewAllEmployees(){
  db.promise().query('SELECT * FROM employee').then(data=>{
    console.table(data[0]);
    start();
  })
}

start();
