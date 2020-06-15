const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const parkingSchema = mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  nbrPlaceV: { type: Number, required: true },
  nbrPlaceM: { type: Number, required: true },
  placeVLibre: { type: Number, required: true },
  placeMLibre: { type: Number, required: true },
  prix: { type: Array, required: true },
});

module.exports = mongoose.model('Parking', parkingSchema);