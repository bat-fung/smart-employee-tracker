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



  })
}