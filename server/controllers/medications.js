const MedicationsModel = require('../models/medications');

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
    create
};