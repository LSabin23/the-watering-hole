const { User, Thought } = require('../models')

const thoughtController = {
  // GET all thoughts
  // /api/thoughts
  getAllThought (req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err)
        res.status(400).json(err)
      })
  },

  // GET single thought by id
  // /api/thoughts/:thoughtId
  getThoughtById ({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        // if no user is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id!' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch(err => {
        console.log(err)
        res.status(404).json(err)
      })
  },

  // POST (create) new thought
  // /api/thoughts
  // create a new Thought then use .findOneAndUpdate() to update the User the newly created Thought belongs to
  createThought ({ body }, res) {
    // console.log(body)
    Thought.create(body)
      // destructure the new Thought's _id to use in the update
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          // use the userId passed from the body to locate the User _id that matches
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        )
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' })
          return
        }
        res.json(dbUserData)
      })
      .catch(err => res.status(400).json(err))
  },

  // POST (create) new reaction to store in a single thought's reactions array
  // /api/thoughts/:thoughtId/reactions
  createReaction ({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      // this pushes the body content to the ReactionSchema through the Thought model
      { $push: { reactions: body } },
      { new: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id!' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.status(400).json(err))
  },

  // PUT (update) thought by id
  // /api/thoughts/:thoughtId
  updateThought ({ params, body }, res) {
    // runValidators: true here makes sure that we don't try to update an existing thought with non-permitted data (instead of just validating on creation)
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id!' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.status(400).json(err))
  },

  // DELETE thought by id
  // /api/thoughts/:thoughtId
  deleteThought ({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this id!' })
          return
        }
        res.json(dbThoughtData)
      })
      .catch(err => res.status(400).json(err))
  },

  // DELETE reaction by pulling it from the thought's *reactions* array by the reaction's reactionId
  // /api/thoughts/:thoughtId/reactions/:reactionId
  // using .findOneAndUpdate() - because we're *updating* information on a Thought - to remove the reactionId from the reactions list as a 'delete'
  deleteReaction ({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData)
      )
      .catch(err => res.json(err))
  }
}

module.exports = thoughtController
