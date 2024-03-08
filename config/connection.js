const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api');

// When successfully connected
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to MongoDB.');
});

// If there is a connection error
mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.');
});

// Export the database connection to be imported and used in other parts of the application
module.exports = mongoose.connection;
