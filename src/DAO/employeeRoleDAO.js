const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection/database');


const Role = sequelize.define('Role', {
  // Model attributes are defined here
  cargo_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo_descricao:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo_data:{
    type: DataTypes.DATE,
    allowNull: false,
  }

}, {
    
    tableName: 'tb_cargos',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
      
});


module.exports = Role