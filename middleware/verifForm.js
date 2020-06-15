const { check, validationResult, matchedData } = require('express-validator');

module.exports = (req, res, next) => {
  	[
		check('nom')
			.isLength({ min: 1 }),
		check('nbrPlaceV')
			.isLength({ min: 1 }),
		check('nbrPlaceM')
			.isLength({ min: 1 }),
	]
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		next();
	} else {
		res.render('/', {
			errors: errors.array(),
		});
	}
};