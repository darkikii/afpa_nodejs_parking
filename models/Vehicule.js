const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const vehiculeSchema = mongoose.Schema({
  type: { type: String, required: true },
  plaque: { type: String, required: true, unique: true },
  paye: { type: Boolean, required: true },
  dateEntre: {type: Date, required: true },
  parking: { type: String, required: true },
});

vehiculeSchema.plugin(mongoosePaginate);
vehiculeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Vehicule', vehiculeSchema);