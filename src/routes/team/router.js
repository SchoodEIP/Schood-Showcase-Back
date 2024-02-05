const express = require('express')
const router = express.Router()

const getTeam = require('./getTeam')
const postTeam = require('./postTeam')
const patchTeam = require('./patchTeam')
const deleteTeam = require('./deleteTeam')
const auth = require('../../middleware/auth')

/**
 * Team router connection
 * @memberof module:router~mainRouter
 * @inner
 * @namespace teamRouter
 */

// Created router routes connection

router.get('/', getTeam)
router.post('/', auth, postTeam)
router.patch('/:id', auth, patchTeam)
router.delete('/:id', auth, deleteTeam)

module.exports = router
