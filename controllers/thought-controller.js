const { Thought } = require('../models')

const thoughtController = {
  // GET all thoughts
  // /api/thoughts

  // GET single thought by id
  // /api/thoughts/:thoughtId

  // POST (create) new thought
  // /api/thoughts
  // remember to push created thought's _id to associated user's thoughts array field - by username

  // POST (create) new reaction to store in a single thought's reactions array
  // /api/thoughts/:thoughtId/reactions

  // PUT (update) thought by id
  // /api/thoughts/:thoughtId

  // DELETE thought by id
  // /api/thoughts/:thoughtId

  // DELETE reaction by pulling it from the thought's *reactions* array by the reaction's reactionId
  // /api/thoughts/:thoughtId/reactions/:reactionId
  
}

module.exports = thoughtController
