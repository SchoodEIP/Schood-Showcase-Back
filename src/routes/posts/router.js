const express = require('express')
const router = express.Router()

const getPosts = require('./getPosts')
const postPosts = require('./postPosts')
const patchPosts = require('./patchPosts')
const deletePosts = require('./deletePosts')
const auth = require('../../middleware/auth')

/**
 * Posts router connection
 * @memberof module:router~mainRouter
 * @inner
 * @namespace PostsRouter
 */

// Created router routes connection

router.get('/', getPosts)
router.post('/', auth, postPosts)
router.patch('/:id', auth, patchPosts)
router.delete('/:id', auth, deletePosts)

module.exports = router
