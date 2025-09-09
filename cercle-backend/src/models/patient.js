const { DataTypes } = require('sequelize')
const sequelize = require('../services/sequelize')

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  sex: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: false
  }
})

module.exports = Patient
