const User = require('../models/User');
const app = require('../../app')

exports.addUser = async (req, res) => {
  const { name, email, password, role, total_absence_days } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
      role,
      total_absence_days
    });
    // const message = `User created:\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nTotal absence days: ${user.total_absence_days}`;
    // alert(message);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'There was a problem adding the user. Please try again.' });
  }
};
