const mongoose = require('mongoose');
const DronesModel = require('../models/drones');
const MedicationsModel = require('../models/medications');

mongoose.connect('mongodb://localhost:27017/task-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let drones = [{
    "serial": "1",
    "model": "Lightweight",
    "capacityLimit": 100,
    "battery": 100,
    "state": "IDLE"
}, {
    "serial": "2",
    "model": "Middleweight",
    "capacityLimit": 200,
    "battery": 80,
    "state": "IDLE"
}, {
    "serial": "3",
    "model": "Cruiserweight",
    "capacityLimit": 300,
    "battery": 100,
    "state": "IDLE"
}, {
    "serial": "4",
    "model": "Heavyweight",
    "capacityLimit": 500,
    "battery": 30,
    "state": "IDLE"
}];

(async () => {
    await DronesModel.create(drones);
    process.exit();
})();