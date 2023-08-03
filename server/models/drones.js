const { Schema, model } = require('mongoose');
const { preSave } = require('../hooks/drones');

const dronesSchema = new Schema({
    serial: {
        type: String,
        maxLength: 100,
        required: true,
        unique: true
    },
    model: {
        type: String,
        enum: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'],
        required: true
    },
    capacity: {
        type: Number,
        min: 0,
        max: 500,
        default: 0
    },
    capacityLimit: {
        type: Number,
        min: 0,
        max: 500,
        required: true
    },
    battery: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    state: {
        type: String,
        enum: ['IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'],
        required: true
    },
    medications: [{
        type: Schema.Types.ObjectId,
        ref: 'Medications',
        default: []
    }]
});

dronesSchema.pre('save', preSave);

module.exports = model('Drones', dronesSchema);;