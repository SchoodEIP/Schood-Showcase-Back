/**
 * @module models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')

// We create the Project for timeline and we setup the required variables

/**
 * Project schema, containing name, description, contacts
 * @constructor Project
 */
const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contacts: [{
    type: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
  }]
})

// We create project collection from projectSchema
const Project = mongoose.model('project', projectSchema)

// We check if all required variables are here

const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    contacts: Joi.array(),
  })
  return schema.validate(data)
}

const validatePatch = (data) => {
    const schema = Joi.object({
        name: Joi.string(),
        description: Joi.string(),
        contacts: Joi.array(),
    })
    return schema.validate(data)
}

module.exports = { Project, validateRegister, validatePatch }
