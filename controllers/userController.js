const User = require('../models/user');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get a single user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update a user by id
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete a user by id
exports.deleteUser = async (req, res) => {
    try {
        const userToDelete = await User.findByIdAndDelete(req.params.userId);
        if (!userToDelete) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User successfully deleted' });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.addFriend = async (req, res) => {
    // Logic to add a friend
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId }},
            { new: true, runValidators: true }
        ).populate('friends');

        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error adding friend', error: error });
    }
};

exports.removeFriend = async (req, res) => {
    // Logic to remove a friend
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId }},
            { new: true }
        ).populate('friends');

        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error removing friend', error: error });
    }
};