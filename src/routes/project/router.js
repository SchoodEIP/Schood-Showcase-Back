const express = require('express')
const router = express.Router()

const getProject = require('./getProject')
const postProject = require('./postProject')
const patchProject = require('./patchProject')
const deleteProject = require('./deleteProject')
const auth = require('../../middleware/auth')

/**
 * Project router connection
 * @memberof module:router~mainRouter
 * @inner
 * @namespace projectRouter
 */

// Created router routes connection

router.get('/', getProject)
router.post('/', auth, postProject)
router.patch('/', auth, patchProject)
router.delete('/', auth, deleteProject)

module.exports = router
