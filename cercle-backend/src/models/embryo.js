const { DataTypes } = require('sequelize')
const sequelize = require('../services/sequelize')

const Embryo = sequelize.define('Embryo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fertilization_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fertilization_method: {
    type: DataTypes.ENUM('ICSI', 'Traditional'),
    allowNull: false,
  },
  pgta_performed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
})

module.exports = Embryo
