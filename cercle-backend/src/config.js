require('dotenv').config()

const config = {
  DB_HOST: '',
  DB_USER: '',
  DB_PASSWORD: '',
  DB_NAME: '',
  DB_DIALECT: 'postgresql',
  PORT: process.env.PORT,
}

module.exports = config
