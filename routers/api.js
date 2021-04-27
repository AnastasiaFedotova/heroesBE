const { Router } = require('express');
const { v4 } = require('uuid');
const service = require('../service/service.js');
const api = Router();

api.get('/', async (req, res, next) => {
    const heroes = await service.readListHeroes();
    res.json(heroes);
    console.log(heroes)
});

api.post('/', async (req, res, next) => {
    const id = v4();
    const { body } = req;

    body.id = id;
    const newBody = await service.createHero(body);

    res.json(newBody);
});

api.put('/:id', async (req, res, next) => {
    const { body } = req;
    const newBody = await service.updateHero({
        ...body,
        id: req.params.id,
    });

    res.json(newBody);
});

api.delete('/:id', async (req, res, next) => {
    await service.removeHero(req.params.id);
    res.sendStatus(204).json(null);
});

module.exports = api;
