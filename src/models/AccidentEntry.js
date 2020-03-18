const mongoose = require('mongoose');

/* 
title:  { type: String, default: "Accident"},
description: String,
isResolved: { type: Boolean, default: false },
dateNtime: { type: Date },
latitude: { type: Number, required: true, min: -90, max: 90 },
longitude: { type: Number, required: true, min: -180, max: 180 },
numberOfInjuries: { type: Number, min: 0, default: 0 },
*/

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
