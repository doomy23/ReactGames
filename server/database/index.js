const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../utils/config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.options);
const db = {};

// Read all the files in this directory and import them as models
fs.readdirSync(path.join(__dirname, '../models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, '../models', file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
