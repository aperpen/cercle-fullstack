module.exports = class Forbidden extends Error {
  constructor(message) {
    super(message || 'Forbidden') // Override message

    this.name = this.constructor.name
    this.status = 403
  }
}
