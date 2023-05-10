const userRouter = require('./app/routes/userRouter');
const absencesRouter = require('./app/routes/absencesRouter');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./app/models/User');
const Absence = require('./app/models/Absence');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

//Home route
app.use('/', userRouter);
// app.use('/users', absencesRouter);
// app.use('/absences', absencesRouter);

app.use(express.urlencoded({ extended: true }));

// Create a new user with a hashed password and store it in the database
async function createUser(name, email, password, role) {
  try {
    // Generate a salt for the password hash
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user in the database with the hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log(`User ${user.email} created with ID ${user.id}`);
    createAbsence(user.id, '2023-05-16', '2023-05-18', 'Vacation');
    createAbsence(user.id, '2023-05-16', '2023-05-18', 'medical issue');
  } catch (error) {
    console.error(error);
  }
}

// Example usage: create a new employee with email "jane@example.com"
// and password "password123"

async function createAbsence(user_id, start_date, end_date, reason) {
  try {
    const absence = await Absence.create({
      user_id,
      start_date,
      end_date,
      reason,
    });

    console.log(`Absence ${absence.id} created for user ${user_id}`);
  } catch (error) {
    console.error(error);
  }
}


createUser('jane', 'jane@example.com', 'password123', 'employee');
// createUser('pablo', 'pablo@example.com', 'password123', 'manager');
