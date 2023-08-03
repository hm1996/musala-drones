const _ = require('lodash');

function preSave(next) {
    if (this.state == 'LOADING' && this.battery < 25) {
        throw new Error(`Drone ${this.serial} can not be loaded because the battery is bellow 25% (${this.battery})`);
    } 

    if (_.size(this.medications) > 0) {
        let weights = this.medications.reduce((sum, item) => {
            return sum + item.weight;
        }, 0);

        this.markModified('capacity');
        this.set({ capacity: this.capacity - weights});
    }

    next();
}

module.exports = {
    preSave
};