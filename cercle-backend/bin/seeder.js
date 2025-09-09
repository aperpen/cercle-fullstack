'use strict'
const sequelize = require('../src/services/sequelize')

const Patient = require('../src/models/patient')
const Embryo = require('../src/models/embryo')

async function up() {
  const [p1, p2, p3] = await Patient.bulkCreate([
    {
      name: 'Danny Williams',
      birthdate: '1990-01-02',
      sex: 'male',
    },
    {
      name: 'Kono Kalakaua',
      birthdate: '1993-04-05',
      sex: 'female',
    },
    {
      name: 'Catherine Rollins',
      birthdate: '1996-07-08',
      sex: 'female',
    },
  ])

  await Embryo.bulkCreate([
    {
      fertilization_date: '2024-05-06',
      fertilization_method: 'ICSI',
      pgta_performed: true,
      PatientId: p2.getDataValue('id'),
    },
    {
      fertilization_date: '2024-05-06',
      fertilization_method: 'ICSI',
      pgta_performed: false,
      PatientId: p2.getDataValue('id'),
    },
    {
      fertilization_date: '2025-01-02',
      fertilization_method: 'ICSI',
      pgta_performed: false,
      PatientId: p3.getDataValue('id'),
    },
    {
      fertilization_date: '2025-01-02',
      fertilization_method: 'ICSI',
      pgta_performed: false,
      PatientId: p3.getDataValue('id'),
    },
    {
      fertilization_date: '2025-03-04',
      fertilization_method: 'Traditional',
      pgta_performed: false,
      PatientId: p3.getDataValue('id'),
    },
  ])
}

async function down() {
  await Embryo.truncate({ cascade: true })
  await Patient.truncate({ cascade: true })
}

const mode = process.argv[2]?.toLowerCase()

if (!['up', 'down'].includes(mode)) {
  console.error('Usage node seeder.js <up|down>')
  process.exit(1)
}

console.log(`▶️ Launching seeder`)
sequelize
  .authenticate()
  .then(() => {
    console.log('🔗 Connected to the db')

    return sequelize.sync({ alter: true })
  })
  .then(() => {
    console.log('✅ DB models synchronized')

    return down()
  })
  .then(() => {
    if (mode === 'up') return up()
    else return true
  })
  .then(() => {
    console.log('✅ Seeder finished')
    return sequelize.close()
  })
