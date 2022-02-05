const router = require('express').Router()
// import all of the API routes from /api/index.js (no need for index.js though as it's implied)
const apiRoutes = require('./api')

// add prefix of '/api' to all of the api routes imported from the 'api' directory
router.use('/api', apiRoutes)

router.use((req, res) => {
  res.status(404).send('<h1>This watering hole is all dried up. Try another route.</h1>')
})

module.exports = router
