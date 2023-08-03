const { Schema, model } = require('mongoose');

const medicationsSchema = new Schema({
    level: {
        type: String,
        required: true,
        enum: ['WARNING', 'ERROR', 'INFO']
    },
    detail: {
        type: String,
        required: true,
        maxLength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['MONITORING', 'EVENT']
    },
    datetime: {
        type: Date,
        default: Date.now()
    }
});

module.exports = model('Audits', medicationsSchema);;