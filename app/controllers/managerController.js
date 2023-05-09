const db = require('../../config/database');
const body = require('body-parser');
const User = require('../models/User');

// const managerController = {
//   addUser: async (req, res) => {
//     const { name, email, password, role } = req.body;
//     try {
//       // Check if user with the same email already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(409).json({ error: 'User already exists with this email.' });
//       }
//       // Create new user object
//       const newUser = new User({
//         name,
//         email,
//         password,
//         role,
//         total_absence_days: 23 // Set default value for total_absence_days
//       });
//       // Save new user to the database
//       await newUser.save();
//       // Send success response
//       res.status(201).json({ message: 'User created successfully.' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Failed to create user.' });
//     }
//   }
// };

// module.exports = managerController;
