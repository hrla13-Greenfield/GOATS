const Sequelize = require('sequelize');

const db = new Sequelize('myDatabase', 'root', '', {
  host: 'localhost',
  port: 3306,
  timestamps: false,
});

module.exports = db;
