const express = require('express');
const routerParking = express.Router();
const parkingCtrl = require('../controllers/parking');
const vehiculeCtrl = require('../controllers/vehicule');
const verif = require('../middleware/verifForm');

routerParking.get('/creerPark', parkingCtrl.gestionPark);
routerParking.post('/creerPark', verif, parkingCtrl.creerPark);
routerParking.get('/accueil/:nom', parkingCtrl.accueil);
routerParking.post('/choixPark', parkingCtrl.lirePark);
routerParking.get('/modifPark/:nom', parkingCtrl.modifPark);
routerParking.post('/modifParkValid', parkingCtrl.gestModifParkValid);
routerParking.post('/modifPark', parkingCtrl.gestModifPark);
routerParking.get('/', parkingCtrl.index);

routerParking.get('/creerV/:nom', parkingCtrl.gestionV);
routerParking.post('/creerV/:nom', parkingCtrl.creerV);
routerParking.get('/deleteV/:nom', parkingCtrl.gestionDelV);
routerParking.post('/deleteV/:nom', parkingCtrl.deleteV);
routerParking.get('/listV/:nom/:page', parkingCtrl.listV);

module.exports = routerParking;