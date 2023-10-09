const Sequelize = require('sequelize');
const sequelize = require('../config/db');

/* ADDRESS MODEL */

exports.Address = sequelize.define('addresses', {
    street:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [2, 50],
        },
    },
    number: {
        type: Sequelize.INTEGER,
        validate: {
            notEmpty: true,
            len: [1, 10],
        },
    },
    complement: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [2, 100],
        },
    },
    city: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [2, 25],
        },
    },
    state: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [2, 25],
        },
    },
    cep: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [8, 9],
        },
    },
});