const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const studentRoutes = require('./routes/student');
const studentUtilsRoutes = require('./routes/studentUtils');
const schoolSubjectRoutes = require('./routes/schoolSubject');
const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/user');


// const confDbMg = require('./config').dev.database.mongodb;
require ('dotenv').config({ debug: true, override: false });

console.log(process.env.dbName);

const app = express();
// console.log(`mongodb+srv://${confDbMg.user}:${confDbMg.password}@${confDbMg.host}/${confDbMg.db}?retryWrites=true&w=majority`);

mongoose
  .connect(`mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@${process.env.dbHost}/${process.env.dbName}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
//     .catch(() => console.log('Connection failed'));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app
  .use('/api/student', studentRoutes)
  .use('/api/studentUtils', studentUtilsRoutes)
  .use('/api/school', schoolSubjectRoutes)
  .use('/api/home', homeRoutes)
  .use('/api/user', userRoutes);




module.exports = app;