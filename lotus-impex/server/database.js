const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

const storagePath = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.join(__dirname, 'database.sqlite');

fs.mkdirSync(path.dirname(storagePath), { recursive: true });

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false
});

module.exports = sequelize;
