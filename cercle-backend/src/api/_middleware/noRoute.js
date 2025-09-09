const exceptions = require('../_exceptions')

module.exports = (req, res, next) => {
  throw new exceptions.NotFound('Route not found')
}
