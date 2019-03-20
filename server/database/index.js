const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(undefined, undefined, undefined, {
  dialect: 'sqlite',
  storage: ':memory:' // path.join(__dirname, 'db.sqlite') || ':memory:'
});
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
