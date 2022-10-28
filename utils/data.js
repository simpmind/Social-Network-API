const usernames = [
    'Aaran',
    'Courtney',
    'Sarah',
    'Nathaniel',
    'Parker',
    'Zi',
    'Gillian',
    'Jones',
    'Smith',
];

const thoughtText = [
    'Computers are fast; programmers keep it slow.',
    'When I wrote this code, only God and I understood what I did. Now only God knows.',
    'How many programmers does it take to change a light bulb? None, that’s a hardware problem.',
    'Copy-and-Paste was programmed by programmers for programmers actually.',
    'There are two ways to write error-free programs; only the third works.',
];

const reactionBody = [
    'Thats funny',
    'I agree',
    'I understand',
    'Nice',
    'I dont think so',

];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get a random username
const getRandomUserName = () =>
    `${getRandomArrItem(usernames)}${getRandomArrItem(usernames)}`;

// Get a random thought
const getRandomThought = () =>
    `${getRandomArrItem(thoughtText)}`;

// Get a random thought
const getRandomReaction = () =>
    `${getRandomArrItem(reactionBody)}`;
// Export the functions for use in seed.js
module.exports = { getRandomThought, getRandomUserName, getRandomReaction };
