/**
 * @module router
 * @requires express
 */
const express = require('express')
const router = express.Router()

const userRouter = require('./user/router')
const timelineRouter = require('./timeline/router')
const teamRouter = require('./team/router')
const projectRouter = require('./project/router')

/**
 * Main router connection
 * @namespace mainRouter
 */

router.use('/user', userRouter)
router.use('/timeline', timelineRouter)
router.use('/team', teamRouter)
router.use('/project', projectRouter)

module.exports = router
