const MedicationsModel = require('../models/medications');

const list = async (req, res) => {
    try {
        const medications = await MedicationsModel.find({});
        res.status(200).json(medications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const newMedicament = new MedicationsModel(req.body);
        await newMedicament.save();
        res.status(201).json(newMedicament);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    list,
    create
};