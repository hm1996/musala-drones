const { Schema, model } = require('mongoose');

const medicationsSchema = new Schema({
    name: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9_-]+$/, `Invalid value. Only letters, dashes, underscores, and numbers are allowed.`]
    },
    weight: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        match: [/^[A-Z0-9_]+$/, `Invalid value. Only uppercase letters, underscores, and numbers are allowed.`]
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

module.exports = model('Medications', medicationsSchema);;