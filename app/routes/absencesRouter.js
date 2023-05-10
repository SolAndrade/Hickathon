const express = require('express');
const absenceRouter = express.Router();
const absencesController = require('../controllers/absencesController');


// absenceRouter.post('/absences', absencesController.getAbsences, (req, res) => {
//     res.render('absences');
//   });  

// absenceRouter.get('/:id/absences', absencesController.getAbsences, (req, res) => {
//     res.render('absences');
// });
  
// absenceRouter.get('/users/:userId/absences', absencesController.getAbsences);
// absenceRouter.get('/users/:id/absences', absencesController.getAbsencesByUserId);



// absenceRouter.post('/absences/create', absencesController.addAbsence);
// absenceRouter.get('/users/:userId/absences', absencesController.getAbsences);


// absenceRouter.get('/absences', authMiddleware, absencesController.getAbsences);

// // Add a new user
// absenceRouter.post('/absences/create', absencesController.addAbsence);

// // Edit an existing user
// // Route to get the edit form for a specific user
// absenceRouter.get('/absences/:id/edit', absencesController.getAbsenceById);

// // Route to update a specific user
// absenceRouter.post('/absences/:id/update', absencesController.updateAbsenceById);

// // DELETE user by id
// absenceRouter.post('/absences/:id/delete', absencesController.deleteAbsenceById);

// module.exports = absenceRouter;