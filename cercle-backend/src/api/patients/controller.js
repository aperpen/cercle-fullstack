const Embryo = require('../../models/embryo')
const Patient = require('../../models/patient')

module.exports.list = async (req, res, next) => {
  try {
    const patients = await Patient.findAll()
    res.json(patients)
  } catch (err) {
    next(err)
  }
}

module.exports.embryos = async (req, res, next) => {
  try {
    const patients = await Patient.findByPk(parseInt(req.params.id), { include: Embryo })
    res.json(patients)
  } catch (err) {
    next(err)
  }
}

module.exports.create = async (req, res, next) => {
  const { name, birthdate, sex } = req.body
  try {
    const patient = await Patient.create({ name, birthdate, sex })
    res.status(201).json(patient)
  } catch (err) {
    next(err)
  }
}
