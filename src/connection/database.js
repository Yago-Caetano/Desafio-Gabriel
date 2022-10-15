/*const mysql = require('mysql2/promise');

require('dotenv/config');

var pool = mysql.createPool({
    host     : process.env.DATABASE_HOST ? process.env.DATABASE_HOST : 'localhost',
    port:  process.env.DATABASE_PORT ? process.env.DATABASE_PORT : '3306',
    user     : process.env.DATABASE_USER ? process.env.DATABASE_USER : 'root',
    password : process.env.DATABASE_PASS ? process.env.DATABASE_PASS : 'root',
    database : process.env.DATABASE_SCHEMA ? process.env.DATABASE_SCHEMA  : 'default'
  });
   
  exports.pool = pool;
*/
  
const { Sequelize } = require('sequelize');

require('dotenv/config');

const dbName = process.env.DATABASE_SCHEMA;
const dbUser = process.env.DATABASE_USER;
const dbHost = process.env.DATABASE_HOST;
const dbPassword = process.env.DATABASE_PASS;


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  //passar os dados para o sequelize
  dialect: "mysql", //informar o tipo de banco que vamos utilizar
  host: dbHost, //o host, neste caso estamos com um banco local
});

module.exports = sequelize;