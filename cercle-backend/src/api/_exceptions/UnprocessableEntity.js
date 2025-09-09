module.exports = class UnprocessableEntity extends Error {
  constructor (message) {
    super(message || 'Unprocessable entity') // Override message

    this.name = this.constructor.name
    this.status = 422
  }
}
