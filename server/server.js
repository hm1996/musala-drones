const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes/drones'));
app.use(require('./routes/medications'));

const puerto = process.env.PORT || 3000;

app.listen(puerto, () => {
    console.log(`Server started in the port ${puerto}`);
})