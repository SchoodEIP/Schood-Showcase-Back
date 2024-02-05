const request = require('supertest')
const mongoose = require('mongoose')

const server = require('../../serverUtils/testServer')
const dbDefault = require('../../../config/db.default')
const { Users } = require('../../../models/users')

describe('User route tests', () => {
  let app

  beforeAll(async () => {
    process.env.PROD = false
    app = await server.testServer()
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

  describe('Login route', () => {
    it('POST /user/login => Try good login', async () => {
      return await request(app)
        .post('/user/login')
        .send({
          email: 'admin@schood.fr',
          password: 'admin123'
        })
        .expect('Content-Type', /json/)
        .expect(200)
    })

    it('POST /user/login => Try bad email', async () => {
      return await request(app)
        .post('/user/login')
        .send({
          email: 'test',
          password: 'admin123'
        })
        .expect(400)
    })

    it('POST /user/login => Try bad password', async () => {
      return await request(app)
        .post('/user/login')
        .send({
          email: 'admin@schood.fr',
          password: 'test'
        })
        .expect(401)
    })

    it('POST /user/login => Try bad form', async () => {
      return await request(app)
        .post('/user/login')
        .send({
          email: 'test'
        })
        .expect(400)
    })

    it('POST /timeline => Try bad token', async () => {
      const key = 'nope'
      return await request(app)
        .post('/timeline')
        .set({
          'x-auth-token': key
        })
        .send({
          date: new Date(),
          description: 'test',
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it('POST /timeline => Try no token', async () => {
      return await request(app)
        .post('/timeline')
        .send({
          date: new Date(),
          description: 'test',
        })
        .expect('Content-Type', /json/)
        .expect(403)
    })

    it('POST /timeline => Try user not exist', async () => {
      let key

      await request(app)
        .post('/user/login')
        .send({
          email: 'admin@schood.fr',
          password: 'admin123'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          key = response.body.token
        })

      await Users.findOneAndDelete({ firstname: 'admin' })

      return await request(app)
        .post('/timeline')
        .set({
          'x-auth-token': key
        })
        .send({
          date: new Date(),
          description: 'test',
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })
  })
})
