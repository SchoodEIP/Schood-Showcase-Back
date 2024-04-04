/**
 * @module models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')

// We create the Schema for timeline and we setup the required variables

/**
 * Timeline schema, containing date, description, newFeatures
 * @constructor Timeline
 */
const timelineSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  fromDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  toDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  description: {
    type: String,
    required: true
  },
  newFeatures: [{
    type: String,
    required: true
  }]
})

// We create timeline collection from timelineSchema
const Timeline = mongoose.model('timeline', timelineSchema)

// We check if all required variables are here

const validateRegister = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    fromDate: Joi.string().required(),
    toDate: Joi.string().required(),
    description: Joi.string().required(),
    newFeatures: Joi.array().required()
  })
  return schema.validate(data)
}

const validatePatch = (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    fromDate: Joi.string(),
    toDate: Joi.string(),
    description: Joi.string(),
    newFeatures: Joi.array()
  })
  return schema.validate(data)
}

module.exports = { Timeline, validateRegister, validatePatch }
