const userRouter = require('./app/routes/userRouter');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
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
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');


// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

//Home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/users/managerMenu.html');
});

app.use('/', userRouter);
app.use('/users', userRouter);
