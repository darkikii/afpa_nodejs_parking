const Vehicule = require('../models/Vehicule');
var path = require('path');

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
	
	try {
        const vehicule = new Vehicule({
            type: req.body.type,
            plaque: req.body.plaque,
            paye: false,
            dateEntre: new Date(),
            parking: nomParking,
        });
        vehicule.save()
            .then(() => res.status(200).res.render('accueil', { nom: nomParking }))
            .catch(error => res.status(500).send({ error }));
    } catch (error) {
        res.status(401).send(error);
    }
};

