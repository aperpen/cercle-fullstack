'use strict'
const sequelize = require('../src/services/sequelize')

const Patient = require('../src/models/patient')
const Embryo = require('../src/models/embryo')

async function up() {
  await Patient.bulkCreate([
    {
      id: 1,
      name: 'Danny Williams',
      birthdate: '1990-01-02',
      sex: 'male',
    },
    {
      id: 2,
      name: 'Kono Kalakaua',
      birthdate: '1993-04-05',
      sex: 'female',
    },
    {
      id: 3,
      name: 'Catherine Rollins',
      birthdate: '1996-07-08',
      sex: 'female',
    },
  ])

  await Embryo.bulkCreate([
    {
      id: 1,
      fertilization_date: '2024-05-06',
      fertilization_method: 'ICSI',
      pgta_performed: true,
      PatientId: 2,
    },
    {
      id: 2,
      fertilization_date: '2024-05-06',
      fertilization_method: 'ICSI',
      pgta_performed: false,
      PatientId: 2,
    },
    {
      id: 3,
      fertilization_date: '2025-01-02',
      fertilization_method: 'ICSI',
      pgta_performed: false,
      PatientId: 3,
    },
    {
      id: 4,
      fertilization_date: '2025-01-02',
      fertilization_method: 'ICSI',
      pgta_performed: false,
      PatientId: 3,
    },
    {
      id: 5,
      fertilization_date: '2025-03-04',
      fertilization_method: 'Traditional',
      pgta_performed: false,
      PatientId: 3,
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

    const worker = mode === 'up' ? up : down
    return worker()
  })
  .then(() => {
    console.log('✅ Seeder finished')
    return sequelize.close()
  })
