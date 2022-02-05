const router = require('express').Router()

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller')

// all of these routes are prefixed with '/users' through setup in routes/api/index.js

// GET all and POST at /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser)

// set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

// set up POST and DELETE at /api/users/:userId/friends/:friendId
// these are together because we're just associating an existing user as a friend and NOT creating a new user AND simultaneously associating them with an existing one
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend)

module.exports = router
