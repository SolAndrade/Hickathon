const User = require('../models/User');
const app = require('../../app')
const bcrypt = require('bcrypt');

// Add a new user
exports.addUser = async (req, res) => {
    try {
      const { name, email, password, role, total_absence_days } = req.body;
      const user = await User.create({
        name,
        email,
        password,
        role,
        total_absence_days,
      });
      res.redirect('/users');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem adding the user. Please try again.' });
    }
  };
  

//Get a list of all users
exports.getUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.render('users', { users: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem getting the users. Please try again.' });
    }
  };


  // Get edit user page
exports.getEditUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.render('edit', { user });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem getting the user. Please try again.' });
    }
  };
  
  // Post edited user data
  exports.postEditUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        const { name, email, password, role, total_absence_days } = req.body;
        user.name = name;
        user.email = email;
        user.password = password;
        user.role = role;
        user.total_absence_days = total_absence_days;
        await user.save();
        res.redirect('/users');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem updating the user. Please try again.' });
    }
  };
  
// Get a user by their ID
// exports.getUserById = async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.id);
//         if (!user) {
//           res.status(404).json({ message: 'User not found' });
//         } else {
//           res.render('edit', { user: user });
//         }
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'There was a problem getting the user. Please try again.' });
//       }
//   };  
  
//   // Update a user by their ID
//   exports.updateUserById = async (req, res) => {
//     try {
//       const user = await User.findByPk(req.params.id);
//       if (!user) {
//         res.status(404).json({ message: 'User not found' });
//       } else {
//         user.name = req.body.name;
//         user.email = req.body.email;
//         user.role = req.body.role;
//         user.total_absence_days = req.body.total_absence_days;
//         await user.save();
//         res.redirect('/users');
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'There was a problem updating the user. Please try again.' });
//     }
//   };
  
  
// Delete a user and their associated absences by their ID
exports.deleteUserById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        // Delete the user's associated absences
        await Absence.destroy({ where: { UserId: user.id } });
  
        // Delete the user
        await user.destroy();
  
        res.status(204).end();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem deleting the user. Please try again.' });
    }
  };
  
  

  exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        console.log('password:', password);
        console.log('user.password:', user.password);
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      if (user.role === 'employee') {
        res.redirect(`/employee/${user.id}/employeeProfile`);

      } else if (user.role === 'manager') {
        res.redirect('/managerMenu');
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem logging in. Please try again.' });
    }
  };
  
  exports.getEmployeeProfile = async (req, res) => {
    const { id } = req.params;
  
    try {
      const employee = await User.findByPk(id);
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.render('employeeProfile', { employee });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem getting the employee profile. Please try again.' });
    }
  };
  