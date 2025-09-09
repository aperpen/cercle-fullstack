const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.list)

router.get('/:id/embryos', controller.embryos)

router.post('/', controller.create)


module.exports = router
