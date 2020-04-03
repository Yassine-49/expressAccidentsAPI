const db = require('../models');

module.exports = {
    getAll: async (req, res, next) => {
        await db.AccidentEntry.findAll().then(accidentEntries => {
            res.json(accidentEntries);
        });
    },
    getOne: async (req, res, next) => {
        const record = await db.AccidentEntry.findByPk(req.params.id);
        record ? res.json(record) : res.json({ message: 'record not found!' });
    },
    create: async (req, res, next) => {
        const newRecord = await db.AccidentEntry.create({
            ...req.body
        });
        res.json(newRecord);
    },
    update: async (req, res, next) => {
        await db.AccidentEntry.update(
            {
                ...req.body
            },
            {
                where: {id: req.body.id}
            }
        );
        res.json({ message: 'record updated!'});
    },
    delete: async (req, res, next) => {
        const record = await db.AccidentEntry.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({ message: 'record deleted!' });
    }
}