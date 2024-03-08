const Thought = require('../models/Thought');
const User = require('../models/User');

// Get all thoughts
exports.getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find().populate('reactions');
        res.json(thoughts);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get a single thought by id
exports.getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Create a new thought and link it to a user
exports.createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } }, { new: true });
        res.status(201).json(newThought);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update a thought by id
exports.updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(updatedThought);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete a thought by id
exports.deleteThought = async (req, res) => {
    try {
        const thoughtToDelete = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thoughtToDelete) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        await User.findByIdAndUpdate(thoughtToDelete.userId, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        res.json({ message: 'Thought successfully deleted' });
    } catch (error) {
        res.status(500).json(error);
    }
};

// Add a reaction to a thought
exports.addReaction = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(updatedThought);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Remove a reaction from a thought
exports.removeReaction = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(updatedThought);
    } catch (error) {
        res.status(500).json(error);
    }
};
