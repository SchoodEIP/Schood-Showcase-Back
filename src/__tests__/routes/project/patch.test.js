const mongoose = require('mongoose')

const server = require('../../serverUtils/testServer')
const dbDefault = require('../../../config/db.default')
const TestFunctions = require('../../serverUtils/TestFunctions')
const { Project } = require('../../../models/project')

describe('Project route tests', () => {
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

  describe('Project route', () => {
    it('PATCH /project => Try good body', async () => {
      const token = await funcs.login('admin@schood.fr', 'admin123')
      funcs.setToken(token)
      const body = {
        name: 'Test',
        description: 'Test',
        contacts: [{
          type: 'test',
          contact: 'test'
        }]
      }
      const body2 = {
        name: 'Test',
        description: 'Test',
        contacts: [{
          type: 'test',
          contact: 'test'
        }]
      }
      await funcs.post('/project', body, 200, /json/)

      const project = await Project.findOne({})
      await funcs.patch('/project/' + project._id, body2, 200, /json/)
    })

    it('PATCH /project => Try good body2', async () => {
      const token = await funcs.login('admin@schood.fr', 'admin123')
      funcs.setToken(token)
      const body = {
        name: 'Test',
        description: 'Test',
        contacts: [{
          type: 'test',
          contact: 'test'
        }]
      }
      const body2 = {}
      await funcs.post('/project', body, 200, /json/)

      const project = await Project.findOne({})
      await funcs.patch('/project/' + project._id, body2, 200, /json/)
    })

    it('POST /project => Try bad body', async () => {
      const token = await funcs.login('admin@schood.fr', 'admin123')
      funcs.setToken(token)
      const body = {
        name: 'Test',
        description: 'Test',
        contacts: [{
          type: 'test',
          contact: 'test'
        }]
      }
      const body2 = {
        name: 'Test',
        description: 'Test',
        contacts: [{
          type: 'test',
          contact: 'test'
        }],
        test: 'Test'
      }
      await funcs.post('/project', body, 200, /json/)

      const project = await Project.findOne({})
      await funcs.patch('/project/' + project._id, body2, 400, /json/)
    })

    it('POST /project => Try bad body2', async () => {
      const token = await funcs.login('admin@schood.fr', 'admin123')
      funcs.setToken(token)
      const body = {
        name: 'Test',
        description: 'Test',
        contacts: [{
          type: 'test',
          contact: 'test'
        }]
      }
      const body2 = {
        name: 'Test',
        description: 'Test',
        contacts: [{
          type: 'test'
        }]
      }
      await funcs.post('/project', body, 200, /json/)

      const project = await Project.findOne({})
      await funcs.patch('/project/' + project._id, body2, 400, /json/)
    })

    it('POST /project => Try bad objectId', async () => {
      const token = await funcs.login('admin@schood.fr', 'admin123')
      funcs.setToken(token)
      await funcs.patch('/project/' + 'a', {}, 400, /json/)
    })

    it('POST /project => Try bad id', async () => {
      const token = await funcs.login('admin@schood.fr', 'admin123')
      funcs.setToken(token)
      await funcs.patch('/project/' + '6082f660865c902ecdb8b801', {}, 400, /json/)
    })
  })
})
