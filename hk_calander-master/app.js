const path = require('path');
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('./mysql');
const ical = require('./genIcal');

mysql.test();

let app = express();
let routesHandler = (route) => {
     return require(`./routes/${route}`);
}

//routes
app.use('/kalander', routesHandler('calander'));
app.use('/', routesHandler('index'));


// view engine setup
app.listen(8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
