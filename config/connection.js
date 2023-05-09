require('dotenv').config();
const Sequelize = require('sequelize');
//Requiring in Sequelize, then instantiating a new Sequelize object

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
      port: 3306
    });

module.exports = sequelize;
