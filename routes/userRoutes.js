const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, updateUser, getUserbyId, deleteUser, addFriend, removeFriend} = require ('../controllers/userController')

//route for api users
router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getUserbyId).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;