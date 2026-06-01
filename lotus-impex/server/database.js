const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

const defaultStoragePath = path.join(__dirname, 'database.sqlite');
const configuredStoragePath = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : '';

const storagePath = configuredStoragePath && fs.existsSync(path.dirname(configuredStoragePath))
  ? configuredStoragePath
  : defaultStoragePath;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false
});

module.exports = sequelize;
