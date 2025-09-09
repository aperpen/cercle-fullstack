module.exports = class BadRequest extends Error {
  constructor(message) {
    super(message || 'Bad request') // Override message

    this.name = this.constructor.name
    this.status = 400
  }
}
