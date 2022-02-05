const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// this would be used for a front-end
app.use(express.static('public'))

app.use(require('./routes'))

// MONGODB_URI setting is for eventual production server
// localhost if for local server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-hunt', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// setting to true will console.log queries being executed by mongoose
mongoose.set('debug', true)

app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))
