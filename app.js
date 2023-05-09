const pool = require('./config/database');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userController = require('./app/controllers/userController');
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ironhack',
  database: 'Management'
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes and other middleware go here

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.post('/add-user', userController.addUser);


// pool.query('SELECT * FROM users')
//   .then(results => {
//     const users = results[0];
//     console.log(users);
//   })
//   .catch(error => {
//     console.error(error);
//   });
// addUser();