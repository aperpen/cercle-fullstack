module.exports = class NotFound extends Error {
  constructor (message) {
    super(message || 'Not found') // Override message

    this.name = this.constructor.name
    this.status = 404
  }
}
