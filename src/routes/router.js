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
const downloadAPK = require('./downloadAPK')

/**
 * Main router connection
 * @namespace mainRouter
 */

router.use('/user', userRouter)
router.use('/timeline', timelineRouter)
router.use('/team', teamRouter)
router.use('/project', projectRouter)
router.get('/downloadapk', downloadAPK)

module.exports = router
