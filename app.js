var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const dbPool = mysql.createPool({
    host: '127.0.0.1',
    database: 'volunteer',
    connectionLimit: 10, // Adjust this value based on your requirements
    acquireTimeout: 10000, // Set the maximum time (in milliseconds) the pool will try to get a connection before throwing an error
    waitForConnections: true// Whether the pool should queue requests and wait to acquire a connection if all connections are busy
  });
  dbPool.on('error', function(err) {
    console.error('MySQL Pool Error: ', err);
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    resave: false,
    saveUninitialized:true,
    secret: 'super secret string',
    cookie: {secure:false}
}));
app.use(function(req,res,next){
    console.log("The current user is:"+req.session.user);
    next();
});

const redirectLogin=function(req,res,next){
    if (!req.session.username){
        res.redirect('/login.html');
    }else{
        next();
    }
};

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.pool = dbPool;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;