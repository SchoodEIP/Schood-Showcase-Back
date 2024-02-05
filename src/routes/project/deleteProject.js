/**
 * @memberof module:router~mainRouter~projectRouter
 * @inner
 * @namespace project
 */

const Logger = require('../../services/logger')
const { Project } = require('../../models/project')

/**
 * Main getProject function
 * @name DELETE /project
 * @function
 * @memberof module:router~mainRouter~projectRouter~project
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    if (!await Project.findByIdAndDelete(id)) {
      return res.status(400).json({ message: 'Invalid request' })
    }

    return res.status(200).json()
  } catch (error) /* istanbul ignore next */ {
    Logger.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
