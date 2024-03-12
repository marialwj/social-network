const User = require('../models/user'); 

exports.addFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } }, 
            { new: true, runValidators: true }
        ).populate('friends'); 

        if (!user) {
            return res.status(404).send('User not found.');
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Could not add friend', error: error });
    }
};

// Controller to remove a friend
exports.removeFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } }, 
            { new: true }
        ).populate('friends');

        if (!user) {
            return res.status(404).send('User not found.');
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Could not remove friend', error: error });
    }
};
