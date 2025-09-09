require('dotenv').config()

const config = require('./config')
require('./services/console') // Replace console

const sequelize = require('./services/sequelize')
const express = require('./services/express')

console.log(`▶️ Launching service`)
sequelize
  .authenticate()
  .then(() => {
    console.log('🔗 Connected to the db')

    return sequelize.sync({ alter: true })
  })
  .then(() => {
    console.log('✅ DB models synchronized')

    return express.start()
  })
  .then(([server]) => {
    console.log(`📡 HTTP server listening on ${server.address().port}`)
  })
  .catch(err => {
    console.log('Connection error', err)
    process.exit(1)
  })

process.on('SIGINT', async () => {
  console.log('Shutting down server gracefully...')
  await sequelize.close()
  process.exit(0)
})

module.exports = express.app
