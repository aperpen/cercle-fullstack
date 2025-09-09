module.exports = (req, res, next) => {
  const method = req.method?.toUpperCase()
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, X-Media-Token, X-Access-Token, Pragma, Expires')
  }
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Expose-Headers', 'X-Fresh-Token')
  next()
}
