const express = require('express');
const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');
const docs = require('./docs');


require('dotenv').config({debug: true, override: false, path: `.env.${process.env.NODE_ENV}`});
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

const studentRoutes = require('./routes/student');
const studentUtilsRoutes = require('./routes/studentUtils');
const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/user');

const homePostgresRoutes = require('./routes/homePostgres');
const studentPostgresRoutes = require('./routes/studentPostgres');
const studentLessonPostgresRoutes = require('./routes/studentLessonPostgres');


// const confDbMg = require('./config').dev.database.mongodb;


const app = express();
// console.log(`mongodb+srv://${confDbMg.user}:${confDbMg.password}@${confDbMg.host}/${confDbMg.db}?retryWrites=true&w=majority`);

mongoose.set('strictQuery', true);
mongoose
    .connect(`mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@${process.env.dbHost}/${process.env.dbName}?retryWrites=true&w=majority`,
        {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to mongodb'))
    .catch(() => console.log('Connection failed'));


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
    .use('/api/home', homeRoutes)
    .use('/api/user', userRoutes)
    .use('/api/v2/home', homePostgresRoutes)
    .use('/api/v2/student', studentPostgresRoutes)
    .use('/api/v2/studentLesson', studentLessonPostgresRoutes)
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));


module.exports = app;