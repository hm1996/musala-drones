const express = require('express');
const dronesController = require('../controllers/drones');

const app = express();

app.get('/drones/:serial', dronesController.read);
app.get('/drones/:serial/load', dronesController.getLoad);
app.get('/drones/:serial/battery', dronesController.getBattery);
app.get('/drones/state/availables', dronesController.getAvailables);
app.post('/drones', dronesController.create);
app.post('/drones/load/:serial', dronesController.load);

module.exports = app;