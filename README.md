# Social Network API

## Description
This RESTful API allows for simulating a social network where users can post thoughts, react to others' thoughts, and build a friend list, using Node.js, Express, MongoDB, and Mongoose.

## Installation
npm install

## Usage
node server.js
~Test API endpoints with a tool like Insomnia~

## API Endpoints 
- Users: /api/users (GET, POST, PUT, DELETE)
- Thoughts: /api/thoughts (GET, POST, PUT, DELETE)
- Friends: /api/users/:userId/friends/:friendId (POST, DELETE)
- Reactions: /api/thoughts/:thoughtId/reactions (POST, DELETE)

## Models
- User: username, email, thoughts, friends
- Thought: thoughtText, createdAt, username, reactions

## Features

1. Create, update, and delete users and thoughts.
2. Add and remove friends from a user's friend list.
3. Add and remove reactions to thoughts.

## Technologies

1. Node.js
2. Express
3. MongoDB
4. Mongoose

## Video Walkthrough


## License 
N/A
