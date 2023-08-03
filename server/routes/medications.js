const express = require('express');
const medicationsController = require('../controllers/medications');

const app = express();

app.get('/medications', medicationsController.list);
app.post('/medications', medicationsController.create);
app.post('/medications/load', medicationsController.create);

module.exports = app;