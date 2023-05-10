const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const absencesController = require('../controllers/absencesController');
const absencesRouter = require('./absencesRouter');


router.get('/', (req, res) => {
    res.render('login');
  });

// Render the manager's menu
router.get('/managerMenu', (req, res) => {
    res.render('managerMenu');
});

router.post('/login', userController.login);

// Render the employees's profile
router.get('/employee/:id/employeeProfile', userController.getEmployeeProfile);

// Show all users
router.get('/users', userController.getUsers, (req, res) => {
    res.render('users');
});

// router.use('/users/:userId/absences', absencesRouter);

// router.get('/users/:userId/absences', absencesController.getAbsences);


// Render the add a new user page
router.get('/users/create', (req, res) => {
    res.render('add');
  });

// Add a new user
router.post('/users', userController.addUser);


router.get('/users/:id/edit', userController.getEditUser);
router.post('/users/:id', userController.postEditUser);

// Edit an existing user

// Route to update a specific user

// DELETE user by id
// router.post('/:id/delete', userController.deleteUserById);

// Delete a user and their associated absences by their ID
// router.delete('/:id/delete', userController.deleteUserById);


router.get('/users/:userId/absences', absencesController.getAbsencesByUserId);
router.get('/absences/create', absencesController.getAddAbsenceForm);
router.post('/absences', absencesController.addAbsence);
router.get('/absences/:id/editAbsence', absencesController.getEditAbsence);
router.post('/absences/:id/editAbsence', absencesController.postEditAbsence);

module.exports = router;

