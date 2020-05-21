const User = require('../models').User;
const AccidentEntry = require('../models').AccidentEntry;

module.exports = {
    // return all records
    getAll: async (req, res, next) => {
        await AccidentEntry.findAll().then(accidentEntries => {
            res.json(accidentEntries);
        });
    },
    // return one record
    getOne: async (req, res, next) => {
        const record = await AccidentEntry.findByPk(req.params.id);
        record ? res.json(record) : res.json({ message: 'record not found!' });
    },
    // create a record and return it
    create: async (req, res, next) => {
        const newRecord = await AccidentEntry.create({
            ...req.body,
            userId: req.user.id
        });
        res.json({ record: newRecord, message: 'record added!' });
    },
    // update a record and return a message
    update: async (req, res, next) => {
        await AccidentEntry.update(
            {
                ...req.body
            },
            {
                where: {id: req.body.id}
            }
        );
        res.json({ message: 'record updated!'});
    },
    // delete a record and return a message
    delete: async (req, res, next) => {
        console.log('req:', req.body);
        const record = await AccidentEntry.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({ message: 'record deleted!' });
    }
}