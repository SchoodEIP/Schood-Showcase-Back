/**
 * @module models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')

// We create the Team for timeline and we setup the required variables

/**
 * Team schema, containing firstname, lastname, picture, role, description
 * @constructor Team
 */
const teamSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

// We create team collection from teamSchema
const Team = mongoose.model('team', teamSchema)

// We check if all required variables are here

const validateRegister = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    picture: Joi.string().required(),
    role: Joi.string().required(),
    description: Joi.string().required(),
  })
  return schema.validate(data)
}

const validatePatch = (data) => {
    const schema = Joi.object({
        firstname: Joi.string(),
        lastname: Joi.string(),
        picture: Joi.string(),
        role: Joi.string(),
        description: Joi.string(),
    })
    return schema.validate(data)
}

module.exports = { Team, validateRegister, validatePatch }
