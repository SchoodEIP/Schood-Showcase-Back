const { Users } = require('../models/users')
const bcrypt = require('bcryptjs')
const Logger = require('../services/logger')

async function initDefaultUsers () {
  const tmp = await Users.find({ firstname: 'admin' })

  // We check if the db is empty and if it needs to be initialized
  if (tmp === undefined || tmp === null || tmp.length === 0) {
    Logger.info('INFO: Init defaultUsers')

    await bcrypt.hash('admin123', 10).then(async (hash) => {
      // We create a default admin user
      const adminU = new Users({
        email: 'admin@schood.fr',
        password: hash,
      })

      // Save the user admin
      await adminU.save()
    })
  }
}

module.exports = async (test = false) => {
  if (test) Logger.displayed = false
  await initDefaultUsers()
  if (test) Logger.displayed = process.env.LOGGER
}
