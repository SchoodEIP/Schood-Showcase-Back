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
    it('DELETE /project => Try good id', async () => {
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
      await funcs.post('/project', body, 200, /json/)

      const project = await Project.findOne({})

      await funcs.delete('/project/' + project._id, 200, /json/)
    })

    it('DELETE /project => Try bad id', async () => {
      const token = await funcs.login('admin@schood.fr', 'admin123')
      funcs.setToken(token)
      await funcs.delete('/project/' + '6082f660865c902ecdb8b801', 400, /json/)
    })

    it('DELETE /project => Try bad objectid', async () => {
      const token = await funcs.login('admin@schood.fr', 'admin123')
      funcs.setToken(token)
      await funcs.delete('/project/' + 'a', 400, /json/)
    })
  })
})
