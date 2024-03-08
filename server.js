const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Adjust the path as needed
const thoughtRoutes = require('./routes/thoughtRoutes'); // Adjust the path as needed

const PORT = 3001;
const app = express();

app.use(express.json());

// Connecting to MongoDB
mongoose.connect('mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
