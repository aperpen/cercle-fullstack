class Unauthorized extends Error {
  constructor (message, reason) {
    super(message || 'No valid token provided.') // Override message

    this.name = this.constructor.name
    this.status = 401
    this.reason = reason
  }
}

Unauthorized.INVALID_CREDENTIALS = 'INVALID_CREDENTIALS'
Unauthorized.INVALID_TOKEN = 'INVALID_TOKEN'
Unauthorized.EXPIRED_TOKEN = 'EXPIRED_TOKEN'
Unauthorized.NO_VALID_AUTH = 'NO_VALID_AUTH'
Unauthorized.EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED'
// Unauthorized.ACCOUNT_BLOCKED = 'ACCOUNT_BLOCKED'

module.exports = Unauthorized