const pool = require('./config/database');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { addUser } = require('./app/controllers/managerController');

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes and other middleware go here

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

pool.query('SELECT * FROM users')
  .then(results => {
    const users = results[0];
    console.log(users);
  })
  .catch(error => {
    console.error(error);
  });
// addUser();