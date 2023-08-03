const _ = require('lodash');

function preSave(next) {
    if (this.state == 'LOADING' && this.battery < 25) {
        throw new Error(`Drone ${this.serial} can not be loaded because the battery is bellow 25% (${this.battery})`);
    } 

    if (_.size(this.medications) > 0) {
        let weights = this.medications.reduce((sum, item) => {
            return sum + item.weight;
        }, 0);

        let newCapacity = this.capacityLimit - weights;

        if (newCapacity < 0) {
            throw new Error(`Drone ${this.serial} can not be loaded because the capacity after loaded will be bellow 0 (${newCapacity})`);
        }

        if (this.capacity != newCapacity) {
            this.set({ capacity: newCapacity});
            this.markModified('capacity');
        }
    } else if (this.capacity == 0) {
        this.set({ capacity: this.capacityLimit });
        this.markModified('capacity');
    }

    next();
}

module.exports = {
    preSave
};