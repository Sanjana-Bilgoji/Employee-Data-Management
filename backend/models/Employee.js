const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true, len: [2, 100] }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true, len: [2, 100] }
  }
}, {
  tableName: 'employees',
  timestamps: true
});

module.exports = { sequelize, Employee };
