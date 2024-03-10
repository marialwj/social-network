const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); 
const thoughtRoutes = require('./routes/thoughtRoutes'); 
const friendsRoutes = require('./routes/friendRoutes');

const PORT = 3001;
const app = express();

app.use(express.json());

// Connecting to MongoDB
mongoose.connect('mongodb://localhost/social-network-api')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/friends', friendsRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
