const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Management', 'root', 'ironhack', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
        },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('employee', 'manager'),
    allowNull: false
  },
  total_absence_days: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 23
  }
}, {
  timestamps: false
});

module.exports = User;

