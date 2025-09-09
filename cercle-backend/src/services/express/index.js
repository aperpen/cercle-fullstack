const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const compression = require('compression')

const config = require('../../config')

/* Middleware */
const api = require('../../api')
const cors = require('../../api/_middleware/cors')
const errorHandler = require('../../api/_middleware/errorHandler')
const noRoute = require('../../api/_middleware/noRoute')
const logger = require('../../api/_middleware/logger')

const app = express()
const server = http.createServer({}, app)

app.disable('x-powered-by')
app.use(logger)
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors)

// Routes
app.use(api)

app.use(noRoute)
app.use(errorHandler)

module.exports.start = () =>
  new Promise(resolve => server.listen(config.PORT, config.HOST, () => resolve([server, app])))

module.exports.app = app
