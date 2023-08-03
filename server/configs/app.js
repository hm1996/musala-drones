const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB.
mongoose.connect('mongodb://localhost:27017/task-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Express configuration.
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('../routes/drones'));
// TODO: Add medications routes here.
// TODO: Add audits routes here.

module.exports = app;