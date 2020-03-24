const { Router } = require('express');
const router = Router();
const db = require('./../../models');

// READ ALL
router.get('/', async (req, res) => {
    await db.AccidentEntry.findAll().then(accidentEntries => {
        res.json(accidentEntries);
    });
});

// READ ONE
router.get('/:id', async (req, res, next) => {
    try {
        const record = await db.AccidentEntry.findByPk(req.params.id);
        record ? res.json(record) : res.json('record not found!');
       
    } catch (error) {
        next(error);
    }
});

// READ (SEARCH)
// TODO

// CREATE
router.post('/', async (req, res, next) => {
    try {
        const newRecord = await db.AccidentEntry.create({
            ...req.body
        });
        res.json(newRecord);
    } catch (error) {
        if(error.name === 'SequelizeValidationError')
            res.status(400);
        next(error);
    }
});

// UPDATE
router.put('/', async (req, res, next) => {
    try {
        const record = await db.AccidentEntry.findByPk(req.body.id);
        if(record)
        {
            const newRecord = {
                ...record.dataValues,
                ...req.body
            }
            res.json(newRecord);
        }
        else
        {
            res.status(404);
            res.json('record not found!');
        }
    } catch (error) {
        if(error.name === 'SequelizeValidationError')
            res.status(400);
        next(error);
    }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
    try {
        const record = await db.AccidentEntry.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json(record);
    } catch (error) {
        if(error.name === 'SequelizeValidationError')
            res.status(400);
        next(error);
    }
})

module.exports = router;
