import chalk from 'chalk'
import path from 'path'
import config from '../config.js'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const _error = console.error
const _log = console.log
const _warn = console.warn
const basePath = path.resolve(__dirname, '../')

console.log = function () {
  if (config.ENV === 'test') return

  const args = [getPrefix()].concat(Array.from(arguments))
  _log.apply(console, args)
}

console.warn = function () {
  const args = [chalk.yellow('⚠️ [WARN]'), getPrefix()].concat(Array.from(arguments))
  _warn.apply(console, args)
}

console.error = function () {
  const args = [chalk.red('☢ [ERROR]'), getPrefix()].concat(Array.from(arguments))
  _error.apply(console, args)
}

// Get file from which the function was called
// https://stackoverflow.com/questions/16697791/nodejs-get-filename-of-caller-function
const getCaller = () => {
  const originalFunc = Error.prepareStackTrace
  let callerfile
  try {
    const err = new Error()
    Error.prepareStackTrace = (err, stack) => stack

    let currentfile = err.stack.shift().getFileName()
    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName()
      if (currentfile !== callerfile) break
    }
  } catch (e) {}

  Error.prepareStackTrace = originalFunc

  return callerfile
}

// Capitalize word => hey -> Hey
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

// Prefix from path
const getPrefix = () => {
  const callerPath = path.relative(basePath, getCaller()).split('/')

  let prefix = ''
  for (let element of callerPath) {
    if (path.extname(element) === '.js') {
      if (element !== 'index.js') prefix += `[${capitalize(path.basename(element, '.js'))}]`
    } else {
      prefix += `[${capitalize(element)}]`
    }
  }

  return chalk.cyan(prefix)
}
