const { Router } = require('express');
const { v4 } = require('uuid');
const service = require('../../services/heroesService.js');
const api = Router();

api.get('/', async (req, res, next) => {
    const heroes = await service.read();
    res.json(heroes);
});

api.post('/', async (req, res, next) => {
    const id = v4();
    const { body } = req;

    body.id = id;
    const newBody = await service.add(body);

    res.json(newBody);
});

api.put('/:id', async (req, res, next) => {
    const { body } = req;
    const newBody = await service.update({
        ...body,
        id: req.params.id,
    });

    res.json(newBody);
});

api.delete('/:id', async (req, res, next) => {
    await service.remove(req.params.id);
    res.sendStatus(204).json(null);
});

module.exports = api;
