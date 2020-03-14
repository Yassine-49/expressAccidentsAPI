const { Router } = require('express');
const AccidentEntry = require('../models/AccidentEntry');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'hey boi',
    });
});

router.post('/', async (req, res, next) => {
    try {
        const accidentEntry = new AccidentEntry(req.body);
        const createdEntry = await accidentEntry.save();
        res.json(createdEntry);
    } catch (error) {
        next(error);
    }
});

module.exports = router;