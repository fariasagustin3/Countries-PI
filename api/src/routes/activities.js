const express = require("express");
const router = express.Router();
const { Country, Activity } = require("../db.js");
const { postActivity } = require('./controllers/controllers');

router.post('/', postActivity)
// router.post('/', async (req, res) => {
//     const { name, difficulty, duration, season, countries} = req.body;
//     try {
//         let newActivity = await postActivity(name, difficulty, duration, season, countries)
//         res.status(200).send(newActivity)
//     } catch (error) {
//         console.log('Error postActivity en el llamado ' + error)
//     }
// })


module.exports = router;


// const postActivity = async (req, res, next) => {
// 	const { name, difficulty, duration, season, countries } = req.body;
// 	try {
// 		let newActivity = await Activity.create({
// 			name,
// 			difficulty,
// 			duration,
// 			season
// 		});

// 		let selectCountries = await Country.findAll({
// 			where: {
// 				name: countries
// 			}
// 		});

// 		res.send("Activity created successfully!")
// 	} catch(e) {
// 		next(e);
// 	}
// }