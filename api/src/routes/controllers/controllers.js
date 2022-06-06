const axios = require('axios');
const { Country, Activity } = require('../../db.js')
const { Op } = require('sequelize');


// Trae todos los países de la api y los guarda en la base de datos
const apiInfo = async (req, res) => {
	try {
		const getAllCountries = await axios(`https://restcountries.com/v3/all`);
		getAllCountries.data.map(async (e) => {
			await Country.findOrCreate({
				where: {
					id: e.cca3,
					name: e.name.common,
					flag: e.flags[0],
					continent: e.continents[0],
					capital: e.capital ? e.capital[0] : 'no capital',
					subregion: e.subregion || 'no sr',
					area: e.area,
					population: e.population
				},
			});
		});
		console.log("Paises cargados correctamente")
	} catch(e) {
		console.log(e);
	}
}

// GET /countries?name="..." ---> Busca un país por nombre 
const getCountryByName = async (req, res, next) => {
	const { name } = req.query;
	try {
    const country = await Country.findAll({
      where: {
        name: {
            	[Op.iLike] : `%${name}%`
              }
            },
            include: [Activity]
        })
        res.status(200).send(country);
    } catch (e) {
        console.log(e)
    }
}


// GET /countries ---> Busca países de la DB y las envía
const getCountries = async (req, res, next) => {
	try {
		let DBcountries = await Country.findAll({
			include:[Activity]
		})
		res.send(DBcountries);
		next()
	} catch(e) {
		console.log(e);
	}
}


// GET /countries/{idPais} ---> Busca un país por id y lo devuelve con sus actividades
const getCountryByCode = async (req, res, next) => {
	const { id } = req.params;
	const result = await Country.findByPk(id, { include: Activity });
  res.status(200).json({ result });
}

// POST /activities --> crea una nueva actividad
const postActivity = async (req, res, next) => {
    try {
		const { name, difficulty, duration, season, countries } = req.body;
		if(name && difficulty && duration && season && countries) {
			const newActivity = await Activity.create({
				name,
				difficulty,
				duration,
				season
			});
			countries.forEach(async (country) => {
				const selectCountries = await Country.findOne({
					where: {
						name: country
					}
				});
				await newActivity.addCountry(selectCountries)
			})
			res.send('Activity created')
		} else {
			res.status(404).send('error')
		}
		
    } catch (error) {
        console.log('Error postActivity en controller ' + error)
    }
};

	// nos trae las actividades creadas
  	const getActivity = async (req, res, next) => {
	try {
		const infoDb = await Activity.findAll({
		  attribute: ["id"],
		});
		res.status(200).send(infoDb);
		next()
	  } catch (e) {
		console.log(e);
	  }
	};

// filter by continent
// const getContinent = async (continent) => {
//     try {
//         let byContinent = await Country.findAll({
//             where: {
//                 continents: continent
//             },
//             include: [Activity]
//         });
//         return byContinent
//     } catch (error) {
//         console.log('Error en get continent en la funcion ' + error)
//     }
// };



module.exports = {
	apiInfo,
	getCountries,
	getCountryByName,
	getCountryByCode,
	postActivity,
	getActivity
}