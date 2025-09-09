module.exports = (req, res, next) => {
  req._startTime = process.hrtime()
  res.on('finish', () => {
    let diff = process.hrtime(req._startTime)
    req._processTime = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2)

    console.log(
      req.method,
      res.statusCode,
      req.baseUrl + (req.route ? req.route.path : ''),
      req._processTime
    )
  })
  next()
}
