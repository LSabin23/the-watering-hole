const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      // Mongoose match validator uses a regex to check that the input *matches* the allowed sequence of characters
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    // array of thought id's connected to single user
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    // array of other user id's connected to single user
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      // allow virtuals
      virtuals: true
    },
    // don't return the virtual's id
    id: false
  }
)

// get total count of friends and replies on retrieval
// virtuals add virtual properties to a document, but don't store the info in the database
// normally computed values that get evaluated when you try to access their properties
UserSchema.virtual('friendCount').get(function () {
  // class activities example (18-NoSQL: 03-Mongoose-Schema) used .reduce() method because we wanted total discussion around an item so it counted the comments AND replies and added them together, but here we only need the length of the friends array for a total count of the user's friends
  return this.friends.length
})

// create the User model using the UserSchema
const User = model('User', UserSchema)

// export the User model
module.exports = User
