const app = require('./configs/app');
const monitoringTask = require('./tasks/monitoring');

// TODO: Add .env usage here.
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started in the port ${port}`);
});

// Tasks starting.
monitoringTask.start();