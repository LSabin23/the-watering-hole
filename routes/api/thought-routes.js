const router = require('express').Router()

const {
  getAllThought,
  getThoughtById,
  createThought,
  createReaction,
  updateThought,
  deleteThought,
  deleteReaction
} = require('../../controllers/thought-controller')

// all of these routes are prefixed with '/thoughts' through setup in routes/api/index.js

// GET all and POST at /api/thoughts
router
  .route('/')
  .get(getAllThought)
  .post(createThought)

// set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

// set up POST at /api/thoughts/:thoughtId/reactions
// this is separate from the DELETE setup so we can create a new reaction AND associate it with a thought (we won't have the reactionId to include in the endpoint because it won't exist yet)
router
  .route('/:thoughtId/reactions')
  .post(createReaction)

// set up DELETE at /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)

module.exports = router
