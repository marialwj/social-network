const express = require('express');
const mongoose = require('mongoose');

const cwd = process.cwd();

const PORT = 3001;
const app = express();

app.use(express.json());

//connecting to mongo

mongoose.connect('mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});