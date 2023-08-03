const express = require('express');
const medicationsController = require('../controllers/medications');

const app = express();

app.post('/medications', medicationsController.create);
app.post('/medications/load', medicationsController.create);

module.exports = app;