const { Thought } = require('../models')

const thoughtController = {
  // GET all thoughts
  // /api/thoughts

  // GET single thought by id
  // /api/thoughts/:thoughtId

  // POST (create) new thought
  // /api/thoughts
  // create a new Thought then use .findOneAndUpdate() to update the User the newly created Thought belongs to
  // class activity (18-NoSQL: 05-Mongoose-Populate > server.js: line 52)

  // POST (create) new reaction to store in a single thought's reactions array
  // /api/thoughts/:thoughtId/reactions

  // PUT (update) thought by id
  // /api/thoughts/:thoughtId

  // DELETE thought by id
  // /api/thoughts/:thoughtId

  // DELETE reaction by pulling it from the thought's *reactions* array by the reaction's reactionId
  // /api/thoughts/:thoughtId/reactions/:reactionId
  // using .findOneAndUpdate() - because we're *updating* information on a Thought - to remove the reactionId from the reactions list as a 'delete'

}

module.exports = thoughtController
