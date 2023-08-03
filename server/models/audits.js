const { Schema, model } = require('mongoose');

// Audits Schema and Model.
const auditsSchema = new Schema({
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

module.exports = model('Audits', auditsSchema);;