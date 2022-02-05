const { Schema, model, Types } = require('mongoose')
const dateFormat = require('../utils/dateFormat')

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent thought _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
)

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use Mongoose getter with a JS function to format the date to be more human readable
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    // array of reaction id's connected to single thought
    reactions: [ ReactionSchema ]
  },
  {
    toJSON: {
      // allow virtuals
      virtuals: true,
      // allow getters
      getters: true
    },
    // don't return the virtual's id
    id: false
  }
)

// get total count of friends and replies on retrieval
// virtuals add virtual properties to a document, but don't store the info in the database
// normally computed values that get evaluated when you try to access their properties
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
})

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema)

// export the Thought model
module.exports = Thought
