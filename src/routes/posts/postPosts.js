/**
 * @memberof module:router~mainRouter~postsRouter
 * @inner
 * @namespace posts
 */

const Logger = require('../../services/logger')
const { Posts, validateRegister } = require('../../models/posts')

/**
 * Main postPosts function
 * @name POST /posts
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
    // Verif received data
    const { error } = validateRegister(req.body)
    if (error) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    const posts = new Posts({
      title: req.body.title,
      content: req.body.content
    })

    await posts.save()

    // Send posts
    return res.status(200).json(posts)
  } catch (error) /* istanbul ignore next */ {
    Logger.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
