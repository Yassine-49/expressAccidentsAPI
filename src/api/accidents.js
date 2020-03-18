const { Router } = require('express');
const AccidentEntry = require('../models/AccidentEntry');

const router = Router();

router.get('/', async (req, res) => {
    const entries = await AccidentEntry.find();
    res.json(entries);
});

router.post('/', async (req, res, next) => {
    try {

        const newRecord = new AccidentEntry({
            ...req.body
        });
        await newRecord.validate();
        await newRecord.save();

        res.json(newRecord);
        
    } catch (error) {
        if(error.name === 'ValidationError')
            res.status(400);
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const record = await AccidentEntry.findById(req.body._id);
        let newRecord = {
            ...record._doc,
            ...req.body
        }
        await record.overwrite({...newRecord});
        await record.save();
        res.json(record);

    } catch (error) {
        if(error.name === 'ValidationError')
            res.status(400);
        next(error);
    }
});

router.delete('/', async (req, res, next) => {
    try {

        const record = AccidentEntry.findById(req.body._id).remove().exec();
        res.json(record);
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;
