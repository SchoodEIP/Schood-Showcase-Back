const request = require('supertest')
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
    it('PATCH /timeline => Try good body', async () => {
        const token = await funcs.login('admin@schood.fr', 'admin123')
        funcs.setToken(token)
        const body = {
            date: new Date(),
            description: 'testDesc',
            newFeatures: ["feat1", "feat2"]
        }
        const body2 = {
            date: new Date(),
            description: 'testDesc1',
            newFeatures: ["feat2", "feat1"]
        }
        await funcs.post('/timeline', body, 200, /json/)

        const timeline = await Timeline.findOne({})
        await funcs.patch('/timeline/' + timeline._id, body2, 200, /json/)
      })

      it('PATCH /timeline => Try good body2', async () => {
        const token = await funcs.login('admin@schood.fr', 'admin123')
        funcs.setToken(token)
        const body = {
            date: new Date(),
            description: 'testDesc',
            newFeatures: ["feat1", "feat2"]
        }
        const body2 = {}
        await funcs.post('/timeline', body, 200, /json/)

        const timeline = await Timeline.findOne({})
        await funcs.patch('/timeline/' + timeline._id, body2, 200, /json/)
      })
  
      it('POST /timeline => Try bad body', async () => {
        const token = await funcs.login('admin@schood.fr', 'admin123')
        funcs.setToken(token)
        const body = {
            date: new Date(),
            description: 'testDesc',
            newFeatures: ["feat1", "feat2"]
        }
        const body2 = {
            date: new Date(),
            description: 'testDesc1',
            newFeatures: ["feat2", "feat1"],
            nope: "nope"
        }
        await funcs.post('/timeline', body, 200, /json/)

        const timeline = await Timeline.findOne({})
        await funcs.patch('/timeline/' + timeline._id, body2, 400, /json/)
      })
  
      it('POST /timeline => Try bad objectId', async () => {
          const token = await funcs.login('admin@schood.fr', 'admin123')
          funcs.setToken(token)
          await funcs.patch('/timeline/' + "a", {}, 400, /json/)
      })

      it('POST /timeline => Try bad id', async () => {
        const token = await funcs.login('admin@schood.fr', 'admin123')
        funcs.setToken(token)
        await funcs.patch('/timeline/' + "6082f660865c902ecdb8b801", {}, 400, /json/)
    })
  })
})
