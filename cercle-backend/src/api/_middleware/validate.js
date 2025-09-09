const Joi = require('joi')
const BadRequest = require('../_exceptions/BadRequest')
const { language } = require('../../../services/translator')

module.exports =
  (reqSchema, element = 'query', options = {}) =>
  async (req, res, next) => {
    let schema = Joi.isSchema(reqSchema) ? reqSchema : Joi.object(reqSchema)
    try {
      if (req.query.access_token) delete req.query.access_token
      const result = await schema.validateAsync((element && req[element]) || req, options || {})
      if (!options.keepValues) req[element] = result

      next()
    } catch (err) {
      next(
        new BadRequest(
          err.details
            ? (err.details[0].path.pop() || req.language.text('defaultPath', 'joi') || '') +
              ' ' +
              (req.language.text(err.details[0].type, 'joi', err.details[0].context) || err.details[0].message)
            : err.message
        )
      )
    }
  }
