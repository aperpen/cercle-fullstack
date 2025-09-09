const Patient = require('./patient')
const Embryo = require('./embryo')

Patient.hasMany(Embryo);
Embryo.belongsTo(Patient);

