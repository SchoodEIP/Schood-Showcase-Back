const request = require('supertest')

module.exports = class TestFunctions {
  token
  app
  constructor (app) {
    this.app = app
  }

  /**
   * Function to log in as a user
   * @param {String} email
   * @param {String} password
   * @returns {String} Token of the user connected
   */
  async login (email, password) {
    let token

    await request(this.app)
      .post('/user/login')
      .send({
        email,
        password
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        token = response.body.token
      })
    return token
  }

  /**
   * Function to set the token for following function calls
   * @param {String} token
   */
  setToken (token) {
    this.token = token
  }

  /**
   * Function to get the token currently set
   * @returns {String}
   */
  get getToken () {
    return this.token
  }

  /**
   * Function to execute GET method
   * @param {String} route The route for API call
   * @param {Number} expectedCode The expected return code of API call, default 200
   * @param {RegExp} contentType The expected type of content returned by the API call. If null, not checked, default null
   * @param {String} token The token applied to the API call. If not defined, this.token will be applied, default null
   * @param {Function} toExecute Function to execute after API call ended. Takes all the response as parameter, default null
   * @returns {JSON} The body of the response of the API call
   */
  async get (route, expectedCode = 200, contentType = /json/, token = null, toExecute = null) {
    let res

    if (contentType) {
      await request(this.app)
        .get(route)
        .set({
          'x-auth-token': token || this.token
        })
        .expect(expectedCode)
        .expect('Content-Type', contentType)
        .then((response) => {
          res = response.body
          if (toExecute) toExecute(response)
        })
    } else {
      await request(this.app)
        .get(route)
        .set({
          'x-auth-token': token || this.token
        })
        .expect(expectedCode)
        .then((response) => {
          res = response.body
          if (toExecute) toExecute(response)
        })
    }
    return res
  }

  /**
   * Function to execute POST method
   * @param {String} route The route for API call
   * @param {Object} body The body of the API call, default {}
   * @param {Number} expectedCode The expected return code of API call, default 200
   * @param {RegExp} contentType The expected type of content returned by the API call. If null, not checked, default null
   * @param {String} token The token applied to the API call. If not defined, this.token will be applied, default null
   * @param {Function} toExecute Function to execute after API call ended. Takes all the response as parameter, default null
   * @returns {JSON} The body of the response of the API call
   */
  async post (route, body = {}, expectedCode = 200, contentType = null, token = null, toExecute = null) {
    let res

    if (contentType) {
      await request(this.app)
        .post(route)
        .set({
          'x-auth-token': token || this.token
        })
        .send(body)
        .expect(expectedCode)
        .expect('Content-Type', contentType)
        .then((response) => {
          res = response.body
          if (toExecute) toExecute(response)
        })
    } else {
      await request(this.app)
        .post(route)
        .set({
          'x-auth-token': token || this.token
        })
        .send(body)
        .expect(expectedCode)
        .then((response) => {
          res = response.body
          if (toExecute) toExecute(response)
        })
    }
    return res
  }
}
