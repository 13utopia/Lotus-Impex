const { Sequelize } = require('sequelize');
const { databasePath } = require('./storagePaths');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath,
  logging: false
});

module.exports = sequelize;
