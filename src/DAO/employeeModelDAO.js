const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection/database');


const Employee = sequelize.define('Employee', {
  // Model attributes are defined here
  func_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  func_nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  func_telefone:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  func_nascimento:{
    type: DataTypes.DATE
  }

}, {
    
    tableName: 'tb_funcionarios',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
      
});


module.exports = Employee