/**
 * @memberof module:router~mainRouter~postsRouter
 * @inner
 * @namespace posts
 */

const Logger = require('../../services/logger')
const { default: mongoose } = require('mongoose')
const { Posts, validatePatch } = require('../../models/posts')

/**
 * Main patchPosts function
 * @name PATCH /posts
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
    const id = req.params.id
    const { error } = validatePatch(req.body)
    if (error) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    const posts = await Posts.findById(id)
    if (!posts) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    posts.title = req.body.title ? req.body.title : posts.title
    posts.content = req.body.content ? req.body.content : posts.content

    await posts.save()

    // Send posts
    return res.status(200).json(posts)
  } catch (error) /* istanbul ignore next */ {
    Logger.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
