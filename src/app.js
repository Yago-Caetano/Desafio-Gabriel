const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate')

const db = require('./connection/database')

//rotas
const userRoutes = require('./routes/employeeRoutes');
const feedRoutes = require('./routes/feedbackRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

//routes
app.use(`/api/v${process.env.API_VERSION}/user`,userRoutes);
app.use(`/api/v${process.env.API_VERSION}/feedback`,feedRoutes);



app.use(errors());


module.exports = app;