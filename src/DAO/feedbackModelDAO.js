const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection/database');


const FeedBack = sequelize.define('Feedback', {
  // Model attributes are defined here
  feed_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  feed_data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  feed_metas:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  feed_pontos_positivos:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  feed_pontos_negativos:{
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
    
    tableName: 'tb_feedbacks',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
      
});


module.exports = FeedBack;