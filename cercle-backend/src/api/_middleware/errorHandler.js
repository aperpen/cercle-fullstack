const exceptions = require('../_exceptions')

module.exports = (err, req, res, next) => {
  err = castError(err)
  const code = err.status || 500
  if (code >= 500 && !(err instanceof exceptions.ServerError)) console.error(err)

  if (!res.headersSent) {
    res.status(code)
    res.json({
      error: true,
      code: code,
      message: code === 500 || !err.message ? 'Server Error' : err.message,
      reason: err.reason,
    })

    res.end()
  }
}

const castError = err => {
  if (err.name === 'SequelizeValidationError') err = new exceptions.BadRequest(err.message)
  else if (
    err.name === 'SequelizeDatabaseError' &&
    (err.parent.message.includes('invalid input') || err.parent.message.includes('cannot be null'))
  )
    err = new exceptions.BadRequest(err.parent.message)
  return err
}
