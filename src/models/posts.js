/**
 * @module models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')

// We create the Posts for timeline and we setup the required variables

/**
 * Posts schema, containing name, description, contacts
 * @constructor Posts
 */
const postsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  }
})

// We create posts collection from postsSchema
const Posts = mongoose.model('posts', postsSchema)

// We check if all required variables are here

const validateRegister = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
  })
  return schema.validate(data)
}

const validatePatch = (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    content: Joi.string()
  })
  return schema.validate(data)
}

module.exports = { Posts, validateRegister, validatePatch }
