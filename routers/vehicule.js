const express = require('express');
const routerVhl = express.Router();
const parkingCtrl = require('../controllers/parking');
const vehiculeCtrl = require('../controllers/vehicule');
const verif = require('../middleware/verifForm');

routerVhl.get('/accueil/:nom', parkingCtrl.accueil);

routerVhl.get('/creerV/:nom', vehiculeCtrl.gestionV);
routerVhl.post('/creerV/:nom', vehiculeCtrl.creerV);

module.exports = routerVhl;