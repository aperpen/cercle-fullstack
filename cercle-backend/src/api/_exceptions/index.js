const fs = require('fs')
const path = require('path')

for (let file of fs.readdirSync(__dirname)) {
  const fileName = path.basename(file, '.js')
  module.exports[fileName] = require(`./${file}`)
}
