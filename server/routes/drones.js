const express = require('express');
const dronesController = require('../controllers/drones');

const app = express();

app.get('/drones/:serial', dronesController.read);
app.post('/drones', dronesController.create);
app.post('/drones/load/:serial', dronesController.load);

module.exports = app;