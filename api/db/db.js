const Sequelize = require('sequelize');

const db = new Sequelize('mysql://bb23c85be92ed8:fac8d99a@us-cdbr-iron-east-03.cleardb.net/heroku_89dc2ee2c6c627c?reconnect=true', {
  host: 'localhost',
  port: 3306,
  timestamps: false,
});

module.exports = db;
