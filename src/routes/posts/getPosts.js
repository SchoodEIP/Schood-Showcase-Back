/**
 * @memberof module:router~mainRouter~postsRouter
 * @inner
 * @namespace posts
 */

const Logger = require('../../services/logger')
const { Posts } = require('../../models/posts')

/**
 * Main getPosts function
 * @name GET /posts
 * @function
 * @memberof module:router~mainRouter~postsRouter~posts
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 200 if OK and return access token and role name
 * @returns 500 if Internal Server Error
 */
module.exports = async (req, res) => {
  try {
    const posts = await Posts.find({}).sort({date: -1})

    // Send posts
    return res.status(200).json(posts)
  } catch (error) /* istanbul ignore next */ {
    Logger.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
