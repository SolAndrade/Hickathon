const Absence = require('../models/Absence');
const bcrypt = require('bcrypt');


// Get all absences
exports.getAllAbsences = async (req, res) => {
    try {
      const absences = await Absence.findAll();
      res.render('reviewAbsences', { absences });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem getting the absences. Please try again.' });
    }
  };  

exports.getAbsencesByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      const absences = await Absence.findAll({
        where: {
          user_id: userId,
        },
      });
      res.render('absences', { absences, userId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem getting the absences. Please try again.' });
    }
  };
  
  exports.getAddAbsenceForm = async (req, res) => {
    try {
      const userId = req.query.employeeId;
      res.render('addAbsence', { userId });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  };
  
  exports.addAbsence = async (req, res) => {
    try {
      const { startDate, endDate, reason } = req.body;
      const userId = req.body.userId;
  
      const absence = await Absence.create({
        user_id: userId,
        start_date: startDate,
        end_date: endDate,
        reason: reason,
        status: 'pending'
      });
      await absence.save();
      res.redirect(`/users/${userId}/absences`);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  };
  
// Get edit absence form
exports.getEditAbsence = async (req, res) => {
    try {
      const absence = await Absence.findByPk(req.params.id);
      if (!absence) {
        res.status(404).json({ message: 'Absence not found' });
      } else {
        res.render('editAbsence', { absence });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem getting the absence. Please try again.' });
    }
  };
  
  // Post edited absence data
exports.postEditAbsence = async (req, res) => {
    try {
      const absence = await Absence.findByPk(req.params.id);
      if (!absence) {
        res.status(404).json({ message: 'Absence not found' });
      } else {
        const { start_date, end_date, reason } = req.body;
        absence.start_date = start_date;
        absence.end_date = end_date;
        absence.reason = reason;
        await absence.save();
        // const userId = req.user.id;
        // res.redirect(`/users/${userId}/absences`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem updating the absence. Please try again.' });
    }
  };

  exports.approveAbsence = async (req, res) => {
    try {
      const absence = await Absence.findByPk(req.params.id);
      if (!absence) {
        res.status(404).json({ message: 'Absence not found' });
      } else {
        absence.status = 'approved';
        await absence.save();
        const absences = await Absence.findAll();
        res.render('reviewAbsences', { absences });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem approving the absence. Please try again.' });
    }
  };
  
  exports.rejectAbsence = async (req, res) => {
    try {
      const absence = await Absence.findByPk(req.params.id);
      if (!absence) {
        res.status(404).json({ message: 'Absence not found' });
      } else {
        absence.status = 'rejected';
        await absence.save();
        const absences = await Absence.findAll();
        res.render('reviewAbsences', { absences });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem denying the absence. Please try again.' });
    }
  };
  
  