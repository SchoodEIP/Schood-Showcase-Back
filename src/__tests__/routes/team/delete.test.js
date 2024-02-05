const mongoose = require('mongoose')

const server = require('../../serverUtils/testServer')
const dbDefault = require('../../../config/db.default')
const TestFunctions = require('../../serverUtils/TestFunctions')
const { Team } = require('../../../models/team')

describe('Team route tests', () => {
  let app
  let funcs

  beforeAll(async () => {
    process.env.PROD = false
    app = await server.testServer()
    funcs = new TestFunctions(app)
  })

  afterEach(async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany()
    }
    await dbDefault(true)
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  describe('Team route', () => {
    it('DELETE /team => Try good id', async () => {
      const token = await funcs.login('admin@schood.fr', 'admin123')
      funcs.setToken(token)
      const body = {
        firstname: "Test",
        lastname: "Test",
        picture: "Test",
        role: "Test",
        description: "Test",
      }
      await funcs.post('/team', body, 200, /json/)

      const team = await Team.findOne({})

      await funcs.delete('/team/' + team._id, 200, /json/)
    })

    it('DELETE /team => Try bad id', async () => {
        const token = await funcs.login('admin@schood.fr', 'admin123')
        funcs.setToken(token)
        await funcs.delete('/team/' + "6082f660865c902ecdb8b801", 400, /json/)
    })

    it('DELETE /team => Try bad objectid', async () => {
        const token = await funcs.login('admin@schood.fr', 'admin123')
        funcs.setToken(token)
        await funcs.delete('/team/' + "a", 400, /json/)
    })
  })
})
