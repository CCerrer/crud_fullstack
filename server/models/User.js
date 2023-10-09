const Sequelize = require('sequelize');
const sequelize = require('../config/db');

/* USER MODEL */

exports.User = sequelize.define('users', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [8, 50],
    },
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,     
      notEmpty: true,  
      len: [5, 50],      
    },
  },
  phone: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      len: [11, 25],
    },
  },
  userPassword: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      len: [8, 50],
    },
  },
});