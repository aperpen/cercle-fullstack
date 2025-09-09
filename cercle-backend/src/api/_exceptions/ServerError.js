module.exports = class ServerError extends Error {
    constructor (message) {
      super(message || 'Server error') // Override message
  
      this.name = this.constructor.name
      this.status = 500
    }
  }
  