const { User } = require('../models')

// implement Mongoose methods for controller queries
const userController = {
  // GET all users
  // /api/users
  getAllUser (req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err)
        res.status(400).json(err)
      })
  },

  // GET single user by id
  // /api/users/:userId
  getUserById ({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        // if no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' })
          return
        }
        res.json(dbUserData)
      })
      .catch(err => {
        console.log(err)
        res.status(404).json(err)
      })
  },

  // POST (create) new user
  // /api/users
  createUser ({ body }, res) {
    // our schemas will handle the body content
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(404).json(err))
  },

  // POST (create) new friend on user's friend list
  // /api/users/:userId/friends/:friendId
  addFriend ({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No comment found with this id!' })
          return
        }
        res.json(dbUserData)
      })
      .catch(err => res.status(400).json(err))
  },

  // PUT (update) user by id
  // /api/users/:userId
  updateUser ({ params, body }, res) {
    // runValidators: true here makes sure that we don't try to update an existing user with non-permitted data (instead of just validating on creation)
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' })
          return
        }
        res.json(dbUserData)
      })
      .catch(err => res.status(400).json(err))
  },

  // DELETE user by id
  // /api/users/:userId
  deleteUser ({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' })
          return
        }
        res.json(dbUserData)
      })
      .catch(err => res.status(400).json(err))
  },

  // DELETE (remove) friend from user's friend list
  // /api/users/:userId/friends/:friendId
  // using .findOneAndUpdate() - because we're *updating* information on a User - to remove the friendId from the friend list as a 'delete'
  removeFriend ({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData)
      )
      .catch(err => res.json(err))
  }
}

module.exports = userController
