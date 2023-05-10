const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const absencesController = require('../controllers/absencesController');

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

// Render the add a new user page
router.get('/users/create', (req, res) => {
    res.render('add');
  });

// Add a new user
router.post('/users', userController.addUser);

// Route to update a specific user
router.get('/users/:id/edit', userController.getEditUser);
router.post('/users/:id', userController.postEditUser);

// DELETE user by id
// router.post('/:id/delete', userController.deleteUserById);

// Delete a user and their associated absences by their ID
// router.delete('/:id/delete', userController.deleteUserById);

//Absences
// Route to get all the absences from a user
router.get('/users/:userId/absences', absencesController.getAbsencesByUserId);
// Route to add a new absence
router.get('/absences/create', absencesController.getAddAbsenceForm);
router.post('/absences', absencesController.addAbsence);
// Route to get and update an absence
router.get('/absences/:id/editAbsence', absencesController.getEditAbsence);
router.post('/absences/:id/editAbsence', absencesController.postEditAbsence);
// Route to get all the existing absences
router.get('/absences', absencesController.getAllAbsences);
// Route to update absence status to "approved"
router.post('/absences/:id/approve', absencesController.approveAbsence);
// Route to update absence status to "denied"
router.post('/absences/:id/reject', absencesController.rejectAbsence);

module.exports = router;

