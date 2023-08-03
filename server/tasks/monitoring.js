const _ = require('lodash');
const { CronJob } = require('cron');
const DronesModel = require('../models/drones');
const AuditsModel = require('../models/audits');

// Monitoring cronjob.
// TODO: It's only monitoring the battery percentages of drones.
module.exports = new CronJob('* * * * *', async () => {
    // TODO: Use property exclusions to avoid retrieving all the docs data from database.
    let drones = await DronesModel.find({});
    for (let drone of drones) {
        let auditData = {};

        // TODO: These conditions should be loaded from a configuration database.
        if (drone.battery == 0) {
            auditData = {
                level: 'WARNING',
                detail: `Drone ${drone.serial} battery has run out!`,
                category: 'MONITORING'
            };
        } else if (drone.battery < 25) {
            auditData = {
                level: 'INFO',
                detail: `Drone ${drone.serial} battery is lower than 25%, may not be loaded!`,
                category: 'MONITORING'
            };
        }

        // TODO: Improve the insertion to avoid duplicated alerts or events.
        if (_.size(_.keys(auditData)) > 0) {
            const auditRow = AuditsModel(auditData);
            await auditRow.save();

            console.warn(auditData.detail);
        }
    }
});