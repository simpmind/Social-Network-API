const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThought, getRandomUserName } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    // // Drop existing thought
    await Thought.deleteMany({});

    // // Create empty array to hold the users
    const users = [];
    // // Loop 5 times -- add users to the users array
    for (let i = 0; i < 5; i++) {
        // Get some random assignment objects using a helper function that we imported from ./data
        const username = getRandomUserName();
        const newUser = {
            username: username,
            email: `${username}@gmail.com`,
        };
        users.push(newUser);
    };
    // Add users to the collection and await the results
    await User.collection.insertMany(users);


     // Create empty array to hold the thoughts
    const thoughts = [];
     // Loop 5 times -- add thoughts to the thoughts array
    for (let i = 0; i < 5; i++) {
        const thoughtText = getRandomThought();
        const newThought = {
            thoughtText: thoughtText,
        };
        thoughts.push(newThought);
    };
    // Add thoughts to the collection and await the results
    await Thought.collection.insertMany(thoughts);

    // Log out the seed data to indicate what should appear in the database
    console.table(thoughts);
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
