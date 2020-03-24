const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AccidentEntrySchema = new Schema({
    title:  {type: String, default: "Accident"},
    description: {type: String, default: ""},
    isResolved: {type: Boolean, default: false},
    dateNtime: {type: Date, default: Date.now()},
    latitude: {type: Number, min: -180, max: 180, required: true},
    longitude: {type: Number, min: -90, max: 90, required: true},
    numberOfInjuries: {type: Number, default: 0}
},
{
    timestamps: true,
});

const AccidentEntry = mongoose.model('AccidentEntry', AccidentEntrySchema);

module.exports = AccidentEntry;
