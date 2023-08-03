const { Schema, model } = require('mongoose');

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
        ref: 'Medications'
    }]
});

module.exports = model('Drones', dronesSchema);;