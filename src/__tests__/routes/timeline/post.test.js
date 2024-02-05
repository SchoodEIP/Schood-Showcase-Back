const request = require('supertest')
const mongoose = require('mongoose')

const server = require('../../serverUtils/testServer')
const dbDefault = require('../../../config/db.default')
const TestFunctions = require('../../serverUtils/TestFunctions')

describe('Timeline route tests', () => {
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

  describe('Timeline route', () => {
    it('POST /timeline => Try good body', async () => {
        const token = await funcs.login('admin@schood.fr', 'admin123')
        funcs.setToken(token)
        const body = {
            date: new Date(),
            description: 'testDesc',
            newFeatures: ["feat1", "feat2"]
        }
        await funcs.post('/timeline', body, 200, /json/)
    })

    it('POST /timeline => Try bad body', async () => {
        const token = await funcs.login('admin@schood.fr', 'admin123')
        funcs.setToken(token)
        const body = {
            date: new Date(),
            description: 'testDesc',
        }
        await funcs.post('/timeline', body, 400, /json/)
    })
  })
})
