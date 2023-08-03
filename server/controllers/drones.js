const _ = require('lodash');
const DronesModel = require('../models/drones');
const MedicationsModel = require('../models/medications');

const create = async (req, res) => {
    try {
        let { serial } = req.body;

        const drone = await DronesModel.find({ serial: serial });

        if (_.size(drone) > 0) {
            throw new Error(`Drone ${serial} already exists`);
        }

        const newDrone = new DronesModel(req.body);
        await newDrone.save();
        res.status(201).json(newDrone);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const load = async (req, res) => {
    try {
        let { serial } = req.params;

        const drone = await DronesModel.find({ serial: serial });

        if (!drone) {
            throw new Error(`Drone ${serial} does not exists`);
        }

        const newMedication = new MedicationsModel(req.body);
        await newMedication.save();

        drone.medications.push(newMedication);

        const updatedDrone = await DronesModel.findOneAndUpdate({ serial }, drone);

        res.status(201).json(updatedDrone);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    create,
    load
};