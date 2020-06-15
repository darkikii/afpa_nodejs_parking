const Parking = require('../models/Parking');
const Vehicule = require('../models/Vehicule');
const mongoosePaginate = require('mongoose-paginate-v2');
var path = require('path');

/*page accueil*/
exports.accueil = (req, res, next) => {
    nomParking = req.url.split('/')[2];
    regex=/%20/gi;
    nomParking = nomParking.replace(regex,' ');/*remplace les %20 par espace*/
    Parking.findOne({ nom: nomParking })/*lecture bdd*/
        .then((parkings) => {
            var nom = parkings.nom;
            var nbrPlaceV = parkings.nbrPlaceV;
            var nbrPlaceM = parkings.nbrPlaceM;
            var vLibre = parkings.placeVLibre;
            var mLibre = parkings.placeMLibre;

            res.render('accueil', { nom: nom, nbrPlaceV: nbrPlaceV, nbrPlaceM: nbrPlaceM, vLibre: vLibre, mLibre: mLibre });
        })
        .catch(error => res.status(500).send({ error }));        
};

exports.modifPark = (req, res, next) => {
    nomParking = req.url.split('/')[2];
    regex=/%20/gi;
    nomParking = nomParking.replace(regex,' ');/*remplace les %20 par espace*/
    Parking.findOne({ nom: nomParking })/*lecture bdd*/
        .then((parkings) => {
            var nom = parkings.nom;
            var nbrPlaceV = parkings.nbrPlaceV;
            var nbrPlaceM = parkings.nbrPlaceM;
            var vLibre = parkings.placeVLibre;
            var mLibre = parkings.placeMLibre;
            var id = parkings._id;

            res.render('modif', { nom: nom, nbrPlaceV: nbrPlaceV, nbrPlaceM: nbrPlaceM, vLibre: vLibre, mLibre: mLibre, id: id });
        })
        .catch(error => res.status(500).send({ error }));        
};

exports.gestModifParkValid = (req, res, next) => {
   
    Parking.updateOne(
        { _id: req.body.id },
        { $set: { 
            nom: req.body.nom,
            nbrPlaceV: req.body.nbrPlaceV,
            nbrPlaceM: req.body.nbrPlaceM,
            placeVLibre: req.body.nbrPlaceLibreV,
            placeMLibre: req.body.nbrPlaceLibreM } 
        })
        .then(function(result) {
            res.redirect('accueil/'+req.body.nom);
        })            
};

exports.lirePark = (req, res, next) => {
    /*res.redirect('accueil/'+req.body.select);*/
    res.status(200).json({ select: req.body.parking })
};

/*gestion park*/
exports.gestionPark = (req, res, next) => {
    res.render('creationP');
};

exports.gestModifPark = (req, res, next) => {
    /*res.redirect('modifPark/'+req.body.modif);*/
    res.status(200).json({ select: req.body.parking })
};

/*creer parking*/
exports.creerPark = (req, res, next) => {
    try {
        const parking = new Parking({
            nom: req.body.nom,
            nbrPlaceV: req.body.nbrPlaceV,
            nbrPlaceM: req.body.nbrPlaceM,
            placeVLibre: req.body.nbrPlaceV,
            placeMLibre: req.body.nbrPlaceM,
            prix: {
                '30': 1.8,
                '2' : 4,
                '3' : 6,
                'plus' : 15,
            }
        });
        parking.save()
            .then(() => res.status(200).redirect('accueil/'+req.body.nom))
            .catch(error => res.status(500).send({ error }));
    } catch (error) {
        res.status(401).send(error);
    }
};

exports.index = (req, res, next) => {
    function iterateFunc(doc) {
        req.session.todolist.push(doc.nom);
    }

    function errorFunc(error) {
        console.log(error);
    }

    req.session.todolist = [];

    Parking.find()/*lecture bdd*/
        .then((parkings) => {
            parkings.forEach(iterateFunc, errorFunc);
            res.render('index', { todolist: req.session.todolist });
        })
        .catch(error => res.status(500).send({ error }));
};

/***************************************************************************************************************************
****************************************************************************************************************************
***************************************************************************************************************************/

exports.gestionV = (req, res, next) => {
    nomParking = req.url.split('/')[2].slice(0, -1);
    regex=/%20/gi;
    nomParking = nomParking.replace(regex,' ');/*remplace les %20 par espace*/
    res.render('creationV', { nom: nomParking });
};

exports.creerV = (req, res, next) => {
    nomParking = req.url.split('/')[2];
    regex=/%20/gi;
    nomParking = nomParking.replace(regex,' ');/*remplace les %20 par espace*/

    var test = false;
    if(req.body.payer)
    {
        test = true;
    }

    Parking.findOne({ nom: nomParking })/*lecture bdd*/
        .then((parkings) => {
            try {
                const vehicule = new Vehicule({
                    type: req.body.type,
                    plaque: req.body.plaque,
                    paye: test,
                    dateEntre: new Date(),
                    parking: nomParking,
                });

                if(req.body.type === "voiture"){
                    Parking.updateOne(
                    { nom: nomParking },
                    { $set: { 
                            placeVLibre: parkings.placeVLibre-1,               
                        } 
                    })
                    .then(function(result) {
                    vehicule.save()
                    .then(() => res.status(200).redirect('/accueil/'+nomParking))
                    .catch(error => res.status(500).send({ error }));
                    })
                }
                else{
                    Parking.updateOne(
                    { nom: nomParking },
                    { $set: { 
                            placeMLibre: parkings.placeMLibre-1,               
                        } 
                    })
                    .then(function(result) {
                    vehicule.save()
                    .then(() => res.status(200).redirect('/accueil/'+nomParking))
                    .catch(error => res.status(500).send({ error }));
                    })
                }

            } catch (error) {
                res.status(401).send(error);
            }
                })
        .catch(error => res.status(500).send({ error }));  
};

exports.gestionDelV = (req, res, next) => {
    nomParking = req.url.split('/')[2].slice(0, -1);
    regex=/%20/gi;
    nomParking = nomParking.replace(regex,' ');/*remplace les %20 par espace*/

    function iterateFunc(doc) {
        req.session.todolist.push(doc.plaque);
    }

    function errorFunc(error) {
        console.log(error);
    }

    req.session.todolist = [];

    Vehicule.find({ parking: nomParking })/*lecture bdd*/
        .then((vehicules) => {
            vehicules.forEach(iterateFunc, errorFunc);
            res.render('deleteV', { todolist: req.session.todolist, nom: nomParking});
        })
        .catch(error => res.status(500).send({ error }));
};

exports.deleteV = (req, res, next) => {
    nomParking = req.url.split('/')[2];
    regex=/%20/gi;
    nomParking = nomParking.replace(regex,' ');/*remplace les %20 par espace*/

    Vehicule.findOne({ plaque : req.body.deleteV})
        .then((vehicules) => {
            type = vehicules.type;           
        })
        .catch(error => res.status(500).send({ error }));


    Parking.findOne({ nom: nomParking })/*lecture bdd*/
        .then((parkings) => {
            try {
                if(type === "voiture"){
                    Parking.updateOne(
                    { nom: nomParking },
                    { $set: { 
                            placeVLibre: parkings.placeVLibre+1,               
                        } 
                    })
                    .then(function(result) {
                        Vehicule.deleteOne({ 
                          plaque: req.body.deleteV, 
                        })
                        .then(function(result) {
                          res.status(200).redirect('/accueil/'+nomParking);
                        })
                    })
                }
                else{
                    Parking.updateOne(
                    { nom: nomParking },
                    { $set: { 
                            placeMLibre: parkings.placeMLibre+1,               
                        } 
                    })
                    .then(function(result) {
                        Vehicule.deleteOne({ 
                          plaque: req.body.deleteV, 
                        })
                        .then(function(result) {
                          res.status(200).redirect('/accueil/'+nomParking);
                        })
                    })
                }

            } catch (error) {
                res.status(401).send(error);
            }
        })
        .catch(error => res.status(500).send({ error }));
};

exports.listV = (req, res, next) => {
    nomParking = req.url.split('/')[2];
    regex=/%20/gi;
    nomParking = nomParking.replace(regex,' ');/*remplace les %20 par espace*/

    const options = {
      page: req.url.split('/')[3],
      limit: 3
    };

    Vehicule.paginate({ parking: nomParking}, options)/*lecture bdd*/
        .then((vehicules) => {
            res.render('list', { list: vehicules, nom: nomParking });
        })
        .catch(error => res.status(500).send({ error }));
};
