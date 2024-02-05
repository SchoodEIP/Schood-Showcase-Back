const express = require('express')
const router = express.Router()

const getTimeline = require('./getTimeline')
const postTimeline = require('./postTimeline')
const patchTimeline = require('./patchTimeline')
const deleteTimeline = require('./deleteTimeline')
const auth = require('../../middleware/auth')

/**
 * Timeline router connection
 * @memberof module:router~mainRouter
 * @inner
 * @namespace timelineRouter
 */

// Created router routes connection

router.get('/', getTimeline)
router.post('/', auth, postTimeline)
router.patch('/:id', auth, patchTimeline)
router.delete('/:id', auth, deleteTimeline)

module.exports = router
