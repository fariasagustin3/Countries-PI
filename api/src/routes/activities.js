const express = require("express");
const router = express.Router();
const { Country, Activity } = require("../db.js");
const { postActivity, getActivity } = require('./controllers/controllers');

router.get('/', getActivity)

router.post("/", postActivity)



module.exports = router;
