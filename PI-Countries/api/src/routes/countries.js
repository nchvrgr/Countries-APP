const { Router } = require('express');
const { Country, Activity } = require('../db');
const { Sequelize, Op } = require('sequelize');

const router = Router();

router.get('/', async (req, res, next) => {
	const { name } = req.query;
    try{
        if (name) {
            try {
                let foundCountry = await Country.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${name}%`
                        },
                    },
                    include: Activity
                });
                return res.json(foundCountry);
            } catch (error) {
                next("error");
            }
        } else {
            try {
                var allCountries = await Country.findAll({
                    include: [Activity]    
                });
                return res.json(allCountries);
            } catch (error) {
                console.log("error");
            }
        }
    }
    catch (error) {
        next(error);
    }

});

router.get('/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const country = await Country.findByPk(id, {
			include: [Activity]
		});
		res.json(country);
	} catch (error) {
		next("error");
	}
});


router.post('/:idCountry/activity/:idActivity', (req, res, next) => {
	const { idCountry, idActivity } = req.params;
	Country.findByPk(idCountry)
		.then((country) => {
			console.log('en post country' + country.name);
			return country.addActivity(idActivity);
		})
		.then(() => res.send(200))
		.catch((error) => next(error));
});

module.exports = router;
