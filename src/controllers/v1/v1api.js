const { Router } = require('express');
const router = require('./heroesController')
const v1api = Router();

v1api.use('/heroes', router);

module.exports = v1api;
