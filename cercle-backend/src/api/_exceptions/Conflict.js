module.exports = class Conflict extends Error {
  constructor (message) {
    super(message || 'Conflict') // Override message

    this.name = this.constructor.name
    this.status = 409
  }
}
