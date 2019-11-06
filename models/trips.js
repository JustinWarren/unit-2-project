//THIS IS THE SCHEMA PAGE

const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    nationalpark: { type: String, required: true},
    state: { type: String, required: true},
    season: { type: String, required: true },
    memory: { type: String, required: true},
    img: String
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
