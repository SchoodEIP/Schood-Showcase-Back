const mongoose = require('mongoose')

const server = require('../../serverUtils/testServer')
const dbDefault = require('../../../config/db.default')
const TestFunctions = require('../../serverUtils/TestFunctions')
const { Timeline } = require('../../../models/timeline')

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
    it('DELETE /timeline => Try good id', async () => {
        const token = await funcs.login('admin@schood.fr', 'admin123')
        funcs.setToken(token)
        const body = {
            date: new Date(),
            description: 'testDesc',
            newFeatures: ["feat1", "feat2"]
        }
        await funcs.post('/timeline', body, 200, /json/)

        const timeline = await Timeline.findOne({})

        await funcs.delete('/timeline/' + timeline._id, 200, /json/)
    })

    it('DELETE /timeline => Try bad id', async () => {
        const token = await funcs.login('admin@schood.fr', 'admin123')
        funcs.setToken(token)
        await funcs.delete('/timeline/' + "6082f660865c902ecdb8b801", 400, /json/)
    })

    it('DELETE /timeline => Try bad objectid', async () => {
        const token = await funcs.login('admin@schood.fr', 'admin123')
        funcs.setToken(token)
        await funcs.delete('/timeline/' + "a", 400, /json/)
    })
  })
})
