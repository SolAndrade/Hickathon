const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'manager'], required: true },
  total_absence_days: { type: Number, default: 23 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
