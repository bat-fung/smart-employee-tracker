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

// 'Add' functions
function add(){
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'add',
        message: 'What would you like to add?',
        choices: ['Department', 'Employee role', 'Employee']
      }
    ]).then(function(res){
      switch(res.add){
        case 'Department':
          addDepartment();
          break;
        case 'Employee role':
          addEmployeeRole();
          break;
        case 'Employee':
          addEmployee();
          break;  
        default:
          console.log('default');  
      }
    })
}

function addDepartment(){
  // prompt department info.
  inquirer
    .prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What would you like to name the department?'
      }
    ]).then(function(answer){
      db.query(
        "INSERT INTO department VALUES (DEFAULT, ?)",
        [answer.department],
        function(err){
          if(err) throw err;
          console.log('---------------------------------------------');
          console.log('Departments updated with '+ answer.department);
          console.log('---------------------------------------------');
          start();
          }
      )
    })
}

function addEmployeeRole(){
  // prompt role info.
  inquirer
    .prompt([
      {
        name: 'role',
        type: 'input',
        message: 'Enter role title:'
      },
      {
        name: 'salary',
        type: 'number',
        message: 'Enter salary',
        validate: function(value){
          if(isNaN(value) === false){
            return true;
          }
          return false;
        }
      },
      {
        name: 'department_id',
        type: 'number',
        message: 'Enter department id',
        validate: function(value){
          if(isNaN(value) === false){
            return true;
          }
          return false;
        }
      }
    ]).then(function(answer){
      db.query('INSERT INTO role SET ?',
        {
          title: answer.role,
          salary: answer.salary,
          department_id: answer.department_id
        },
        function(err){
          if(err) throw err;
          console.log('------------------------------------------');
          console.log('Employee Roles updated with '+ answer.role);
          console.log('------------------------------------------');
          start();
        }
    )  
  })
}

function addEmployee(){
  db.query('SELECT * FROM role', function(err, results){
    if(err) throw err;
    // Upon receiving the results, prompt user for new employee info.
    inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Enter employee first name'
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Enter employee last name'
      },
      {
        name: 'role',
        type: 'rawlist',
        choices: function(){
          var choiceArr = [];
          for(i=0; i< results.length; i++){
            choiceArr.push(results[i].title)
          }
          return choiceArr;
        },
        message: 'Select a title'
      },
      {
        name: 'manager',
        type: 'number',
        validate: function(value){
          if(isNaN(value) === false){
            return true;
          }
          return false;
        },
        message: 'Enter manager ID',
        default: '1'
      }
    ]).then(function(answer){
      // object with key value pairs
      db.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role,
          manager_id: answer.manager
        }
      )
      console.log('---------------------------'),
      console.log('Employee successfully added'),
      console.log('---------------------------');
      start()
    });
  });
}

start();
