const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate')

const db = require('./connection/database')

//rotas
const userRoutes = require('./routes/employeeRoutes');
const feedRoutes = require('./routes/feedbackRoutes');
const rolesRoutes = require('./routes/employeeRolesRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

//routes
app.use(`/api/v${process.env.API_VERSION}/user`,userRoutes);
app.use(`/api/v${process.env.API_VERSION}/feedback`,feedRoutes);
app.use(`/api/v${process.env.API_VERSION}/roles`,rolesRoutes);


app.use(express.static(__dirname + "/views"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/views/index.html");
});

app.use(errors());


module.exports = app;