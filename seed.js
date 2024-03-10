const mongoose = require('mongoose');
const User = require('./models/User'); 
const Thought = require('./models/Thought'); 
const db = require('./config/connection'); 

// Seed data for Users
const seedUsers = [
    { username: 'paul_mescal', email: 'paulm@ireland.com' },
    { username: 'timothee_chalamet', email: 'timmytim@ny.com' },
    { username: 'jacobelordi', email: 'jacobe@aussie.com' },
    { username: 'taylor_swift', email: 'taylor@swiftie.com' },
    { username: 'zendaya_coleman', email: 'zendaya@shakeup.com' }
];

// Seed data for Thoughts
const seedThoughts = [
    { thoughtText: 'What a beautiful day!', username: 'paul_mescal' },
    { thoughtText: 'Excited about the new movie!', username: 'timothee_chalamet' },
    { thoughtText: 'I love my dog!', username: 'jacobelordi' },
    { thoughtText: 'I love my cat!', username: 'taylor_swift' },
    { thoughtText: 'I love my bf!', username: 'zendaya_coleman' }
];

// Async function to clear old data and insert new seed data
async function seedDB() {
    await mongoose.connect('mongodb://localhost/social-network-api', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected!");

    // Remove old data
    await User.deleteMany({});
    console.log("Old users removed");
    await Thought.deleteMany({});
    console.log("Old thoughts removed");

    // Insert new users and thoughts with corresponding user IDs
    const createdUsers = await User.insertMany(seedUsers);
    console.log("New users added");

    const userMap = createdUsers.reduce((map, user) => {
        map[user.username] = user._id;
        return map;
    }, {});

    const mappedThoughts = seedThoughts.map(thought => ({
        ...thought,
        userId: userMap[thought.username] 
    }));

    await Thought.insertMany(mappedThoughts);
    console.log("New thoughts added");

    //Creating sample friendships between users
    if (createdUsers.length > 1) {
        await User.findByIdAndUpdate(createdUsers[0]._id, { $addToSet: { friends: createdUsers[1]._id } });
        await User.findByIdAndUpdate(createdUsers[1]._id, { $addToSet: { friends: createdUsers[0]._id } });
        console.log("Sample friendships created");
    }

    // Close the MongoDB connection
    mongoose.connection.close();
    console.log("MongoDB disconnected");
}

seedDB().catch(err => console.log(err));
