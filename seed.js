const mongoose = require('mongoose');
const User = require('./models/User'); 
const db = require('./config/connection'); 
const Thought = require('./models/Thought');


const seedUsers = [
    { username: 'beyonce_knowles', email: 'beyonce@queenb.com' },
    { username: 'chris_evans', email: 'chris@captainamerica.com' },
    { username: 'emma_watson', email: 'emma@hogwarts.com' },
    { username: 'leonardo_dicaprio', email: 'leo@titanic.com' },
    { username: 'taylor_swift', email: 'taylor@swiftie.com' },
    { username: 'brad_pitt', email: 'brad@hollywood.com' },
    { username: 'angelina_jolie', email: 'angelina@movies.com' },
    { username: 'johnny_depp', email: 'johnny@pirates.com' },
    { username: 'scarlett_johansson', email: 'scarlett@natasha.com' },
    { username: 'ryan_reynolds', email: 'ryan@deadpool.com' }
];
const seedThoughts = [
    { thoughtText: 'What a beautiful day!', username: 'beyonce_knowles' },
    { thoughtText: 'Excited about the new movie!', username: 'chris_evans' },

];

async function seedDB() {
    await mongoose.connect('mongodb://localhost/social-network-api');
    console.log("MongoDB connected!");

    // Remove old data
    await User.deleteMany({});
    console.log("Old users removed");
    await Thought.deleteMany({});
    console.log("Old thoughts removed");

    // Insert new seed data
    const createdUsers = await User.insertMany(seedUsers);
    console.log("New users added");

    // When inserting thoughts, you might want to associate them with user IDs
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

    // Optional: Create friendships (This is just a basic example. Adjust as needed.)
    if (createdUsers.length > 1) {
        await User.findByIdAndUpdate(createdUsers[0]._id, { $addToSet: { friends: createdUsers[1]._id } });
        await User.findByIdAndUpdate(createdUsers[1]._id, { $addToSet: { friends: createdUsers[0]._id } });
        console.log("Sample friendships created");
    }

    mongoose.connection.close();
    console.log("MongoDB disconnected");
}

seedDB().catch(err => console.log(err));
