require('dotenv').config();

/* DATABASE CONNECTION */

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
    },
  }
);

module.exports = sequelize;