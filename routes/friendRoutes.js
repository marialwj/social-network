const express = require('express');
const router = express.Router();
const {
    getAllUsers,getUserById,createUser,updateUser, deleteUser,addFriend,removeFriend
} = require('../controllers/userController'); 

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Friend routes
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;
