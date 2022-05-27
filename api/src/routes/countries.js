const express = require("express");
const router = express.Router();
const Op = require('sequelize');
const { Activity, Country } = require('../db.js');
const axios = require('axios');
const { 
	getAllCountries,
	getCountries,
	getCountryByName,
	getCountryByCode
} = require('./controllers/controllers');

router.get('/', getCountries)

router.get('/name', getCountryByName)

router.get('/:id', getCountryByCode);




module.exports = router;