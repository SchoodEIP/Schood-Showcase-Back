const request = require('supertest')
const mongoose = require('mongoose')

const server = require('../../serverUtils/testServer')
const dbDefault = require('../../../config/db.default')
const TestFunctions = require('../../serverUtils/TestFunctions')

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
    it('POST /team => Try good body', async () => {
      const token = await funcs.login('admin@schood.fr', 'admin123')
      funcs.setToken(token)
      const body = {
        firstname: 'Test',
        lastname: 'Test',
        picture: 'Test',
        role: 'Test',
        description: 'Test'
      }
      await funcs.post('/team', body, 200, /json/)
    })

    it('POST /team => Try bad body', async () => {
      const token = await funcs.login('admin@schood.fr', 'admin123')
      funcs.setToken(token)
      const body = {
        firstname: 'Test',
        lastname: 'Test',
        picture: 'Test',
        role: 'Test'
      }
      await funcs.post('/team', body, 400, /json/)
    })
  })
})
