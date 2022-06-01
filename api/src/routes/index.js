const { Router } = require("express");
const router = Router();
const morgan = require('morgan');
const countries = require('./countries');
const activities = require('./activities');
const filters = require('./filters');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(morgan('dev'));

router.use('/countries', countries);
router.use('/activities', activities);
// router.use('/filters', filters);


module.exports = router;
