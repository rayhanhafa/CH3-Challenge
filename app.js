const express = require('express');
const morgan = require("morgan");

const app = express();

const carRouter = require('./routes/carRoutes')

//middleware untuk membaca json dari body kita
app.use(express.json())

//middleware dari thrid party = 3rd party middleware
app.use(morgan('dev'));

//middleware kita tentang request time
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use("/", carRouter);


module.exports = app;
