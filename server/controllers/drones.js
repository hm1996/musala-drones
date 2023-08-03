const _ = require('lodash');
const DronesModel = require('../models/drones');
const MedicationsModel = require('../models/medications');

const read = async (req, res) => {
    try {
        let { serial } = req.params;

        const drone = await DronesModel.findOne({ serial: serial }).populate('medications');

        if (_.isNull(drone)) {
            throw new Error(`Drone ${serial} does not exists`);
        }

        res.status(200).json(drone);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getLoad = async (req, res) => {
    try {
        let { serial } = req.params;

        const drone = await DronesModel.findOne({ serial: serial }).populate('medications');

        if (_.isNull(drone)) {
            throw new Error(`Drone ${serial} does not exists`);
        }

        res.status(200).json({ medications: drone.medications });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAvailables = async (req, res) => {
    try {
        const drones = await DronesModel.find({ state: 'IDLE', capacity: {
            $gt: 0
        }});

        res.status(200).json({ drones });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getBattery = async (req, res) => {
    try {
        let { serial } = req.params;

        const drone = await DronesModel.findOne({ serial });

        if (_.isNull(drone)) {
            throw new Error(`Drone ${serial} does not exists`);
        }

        res.status(200).json({ battery: drone.battery });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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

        const drone = await DronesModel.findOne({ serial: serial }).populate('medications');

        if (_.isNull(drone)) {
            throw new Error(`Drone ${serial} does not exists`);
        }

        if (drone.battery < 25) {
            throw new Error(`Drone ${serial} can not be loaded because the battery is bellow 25% (${drone.battery})`);
        }

        drone.state = 'LOADING';
        await drone.save();

        const newMedications = await MedicationsModel.create(req.body);
        
        if (_.isArray(req.body)) {
            drone.medications = _.isUndefined(drone.medications) ? newMedications : [...drone.medications, ...newMedications];
        } else {
            drone.medications = _.isUndefined(drone.medications) ? [ newMedications ] : [...drone.medications, newMedications];
        }

        drone.state = 'LOADED';
        await drone.save();

        const updatedDrone = await DronesModel.findById(drone._id).populate('medications');
        res.status(201).json(updatedDrone);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    create,
    read,
    getLoad,
    getAvailables,
    getBattery,
    load
};