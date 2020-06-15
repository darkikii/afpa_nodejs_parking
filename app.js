const express = require('express');
var session = require('express-session');
var app = require('express')();
require('./db/db');

const parkingRoutes = require('./routers/parking');

const bodyParser = require('body-parser');
const path = require('path');
app.use('/public', express.static(__dirname + '/public'));

/*pour le CORES*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');/*donne l'acces a tout le monde (*)*/
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(session({
  secret: 'todotopsecret',
  resave: false,
  saveUninitialized: true
}))

app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', parkingRoutes);

module.exports = app; /*exporte notre appli*/