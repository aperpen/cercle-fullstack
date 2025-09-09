const router = require('express').Router()

router.use('/patients', require('./patients'))

module.exports = router
